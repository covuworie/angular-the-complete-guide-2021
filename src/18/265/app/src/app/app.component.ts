import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";

// In the Firebase project go to Realtime Database -> Rules and set the value of
// the ".read" key to false to initiate an Unauthorized error

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = "";
  private errorSubscription: Subscription;

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService.createPost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => (this.loadedPosts = []));
  }

  private fetchPosts() {
    this.errorSubscription = this.postsService.error.subscribe(
      (errorMessage: string) => {
        this.error = errorMessage;
      }
    );

    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
      }
    );
  }
}

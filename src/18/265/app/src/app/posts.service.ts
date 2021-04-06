import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  private static readonly url =
    "https://ng-complete-guide-b5850-default-rtdb.firebaseio.com/posts.json";
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  createPost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    this.http
      .post<{ name: string }>(PostsService.url, postData)
      // Notice here we subscribe to the result of the request. Normally we would
      // do this in the AppComponent. We only do it here as this is a rare care
      // where we do not care about the response in the AppComponent.
      .subscribe(
        (responseData) => console.log(responseData),
        (error: HttpErrorResponse) => this.error.next(error.message)
      );
  }

  fetchPosts() {
    // Notice difference here from the previous lesson:
    // Return the Observable. HTTP request is not sent at this point since
    // subscribe is not called here. It is now called in the AppComponent.
    return this.http.get<{ [key: string]: Post }>(PostsService.url).pipe(
      map((responseData) => {
        const postsArray: Post[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    );
  }

  deletePosts() {
    return this.http.delete(PostsService.url);
  }
}

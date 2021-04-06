import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
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
    let searchParams = new HttpParams();
    // Adds query params to the end of the url
    searchParams = searchParams.append("print", "pretty"); // pretty response
    searchParams = searchParams.append("custom", "key"); // does nothing
    // Notice difference here from the previous lesson:
    // Return the Observable. HTTP request is not sent at this point since
    // subscribe is not called here. It is now called in the AppComponent.
    return this.http
      .get<{ [key: string]: Post }>(PostsService.url, {
        // See Request Headers in browser developer tools under the Network tab
        headers: new HttpHeaders({ "Custom-Header": "Hello" }),
        params: searchParams,
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError((error: HttpErrorResponse) => {
          // Do whatever here, e.g. send to analytics server
          return throwError(error);
        })
      );
  }

  deletePosts() {
    return this.http.delete(PostsService.url);
  }
}

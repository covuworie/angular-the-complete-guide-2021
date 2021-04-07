import {
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log("Request on its way");
    console.log(request.url);
    const modifiedRequet = request.clone({
      headers: request.headers.append("Auth", "xyz"),
    });
    return next.handle(modifiedRequet).pipe(
      tap((event) => {
        console.log(event);
        if (event.type == HttpEventType.Response) {
          console.log("Response arrived, body data: ");
          console.log(event.body);
        }
      })
    ); // instructs request to continue
  }
}

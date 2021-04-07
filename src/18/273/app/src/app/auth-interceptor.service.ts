import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log("Request on its way");
    console.log(request.url);
    const modifiedRequet = request.clone({
      headers: request.headers.append("Auth", "xyz"),
    });
    return next.handle(modifiedRequet); // instructs request to continue
  }
}

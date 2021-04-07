import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AuthInterceptorService } from "./auth-interceptor.service";
import { LoggingInterceptorService } from "./logging-interceptor.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [
    // Dependency injection syntax supported by Angular that:
    // Allows us to register a service (AuthInterceptorService) under a
    // different identifier (HTTP_INTERCEPTORS) and allows
    // us to have multiple services (multi) under that identifier
    // The order matters. Order the interceptors accordingly if necessary!
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

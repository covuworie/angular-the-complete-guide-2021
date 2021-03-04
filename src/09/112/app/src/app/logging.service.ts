import { Injectable } from "@angular/core";

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: "root",
})
export class LoggingService {
  public logStatusChange(status: string) {
    console.log(`A server status changed, new status: ${status}`);
  }
}

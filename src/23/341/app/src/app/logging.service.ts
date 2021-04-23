import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
export class LoggingService {
  lastlog: string;

  printLog(message: string) {
    console.log(message);
    console.log(`last log: ${this.lastlog}`);
    this.lastlog = message;
  }
}

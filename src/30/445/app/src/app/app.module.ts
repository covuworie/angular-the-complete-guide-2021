import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent],
})
export class AppModule {}

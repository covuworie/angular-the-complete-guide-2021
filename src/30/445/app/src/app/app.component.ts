import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AlertComponent } from './alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content: SafeHtml = '';

  constructor(injector: Injector, domSanitizer: DomSanitizer) {
    const AlertElement = createCustomElement(AlertComponent, {
      injector: injector,
    });
    customElements.define('my-alert', AlertElement);

    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml(
        '<my-alert message="Rendered dynamically"><app-alert>'
      );
    }, 1000);
  }
}

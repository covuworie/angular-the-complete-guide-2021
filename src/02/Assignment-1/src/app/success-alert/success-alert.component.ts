import { Component } from "@angular/core";

@Component({
  selector: "app-success-alert",
  template: `<div class="success-message">{{ message }}</div>`,
  styles: [
    `
      .success-message {
        background-color: green;
        margin-left: 5rem;
      }
    `,
  ],
})
export class SuccessAlertComponent {
  message: string;
  constructor() {
    this.message = "Congratulations you have completed this course!";
  }

  ngOnInit(): void {}
}

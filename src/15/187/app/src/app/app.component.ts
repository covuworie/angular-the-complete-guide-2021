import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  suggestUserName() {
    const suggestedName = "Superuser";
  }

  onSubmit(form: NgForm) {
    console.log(form); // See the value attribute after filling in form and clicking on Submit
  }
}

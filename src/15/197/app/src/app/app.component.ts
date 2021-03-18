import { Component, ViewChild } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("form") form: NgForm;
  defaultQuestion = "teacher";
  answer = "";
  genders = ["male", "female"];

  suggestUserName() {
    const suggestedName = "Superuser";
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.form);
  }
}

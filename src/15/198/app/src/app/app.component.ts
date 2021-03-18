import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

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
    // Overwrite all values at once (not best in this scenario)
    // this.form.setValue({
    //   userData: { username: suggestedName, email: "" },
    //   secret: "pet",
    //   questionAnswer: "",
    //   gender: "male",
    // });
    // Overwrite only some values
    this.form.form.patchValue({ userData: { username: suggestedName } });
  }

  // onSubmit(form: NgForm) {
  //   console.log(form);
  // }

  onSubmit() {
    console.log(this.form);
  }
}

import { Component, ViewChild } from "@angular/core";
import { NgForm, NgModelGroup } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  @ViewChild("form") form: NgForm;
  @ViewChild("userData") userData: NgModelGroup;
  defaultQuestion = "teacher";
  answer = "";
  genders = ["male", "female"];
  user = {
    username: "",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: "",
  };
  submitted = false;

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
    this.submitted = true;
    this.user.username = this.userData.value.username;
    this.user.email = this.userData.value.email;
    this.user.secretQuestion = this.form.value.secret;
    this.user.answer = this.form.value.questionAnswer;
    this.user.gender = this.form.value.gender;
  }
}

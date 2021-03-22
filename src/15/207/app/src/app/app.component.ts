import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      gender: new FormControl("male"),
    });
  }

  isInvalid(path: string) {
    const control = this.signUpForm.get(path);
    return !control.valid && control.touched;
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
}

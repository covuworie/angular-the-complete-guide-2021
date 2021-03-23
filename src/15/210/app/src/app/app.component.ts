import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

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
      userData: new FormGroup({
        username: new FormControl("", Validators.required),
        email: new FormControl("", [Validators.required, Validators.email]),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
  }

  isInvalid(path: string) {
    const control = this.signUpForm.get(path);
    return !control.valid && control.touched;
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const control = new FormControl("", Validators.required);
    this.hobbies.push(control);
  }

  get hobbies() {
    return this.signUpForm.get("hobbies") as FormArray;
  }
}

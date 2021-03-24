import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  genders = ["male", "female"];
  signUpForm: FormGroup;
  forbiddenUsernames = ["Chris", "Anna"];

  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl("", [
          Validators.required,
          // Angular calls this function so we need to bind the this reference to
          // the correct object
          this.isUsernameForbidden.bind(this),
        ]),
        email: new FormControl(
          "",
          [Validators.required, Validators.email],
          // no need to bind this reference here since it is not used in the function
          this.isEmailForbidden
        ),
      }),
      gender: new FormControl("male"),
      hobbies: new FormArray([]),
    });
    // this.signUpForm.valueChanges.subscribe((value: {}) => console.log(value));
    this.signUpForm.statusChanges.subscribe((status: string) =>
      console.log(status)
    );
    this.signUpForm.setValue({
      userData: {
        username: "Max",
        email: "max@test.com",
      },
      gender: "male",
      hobbies: [],
    });
    this.signUpForm.patchValue({
      userData: { username: "Anna" },
    });
  }

  isRequired(path: string) {
    const control = this.signUpForm.get(path);
    return !control.valid && control.touched;
  }

  isInvalid(path: string, errorKey: string) {
    const control = this.signUpForm.get(path);
    return control.errors[errorKey];
  }

  onSubmit() {
    console.log(this.signUpForm);
    this.signUpForm.reset({
      gender: "male",
    });
  }

  onAddHobby() {
    const control = new FormControl("", Validators.required);
    this.hobbies.push(control);
  }

  get hobbies() {
    return this.signUpForm.get("hobbies") as FormArray;
  }

  isUsernameForbidden(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { usernameIsForbidden: true };
    }
    // Either return null or omit this statement.
    // Never return { usernameIsForbidden: false }
    return null;
  }

  isEmailForbidden(
    control: FormControl
  ):
    | Promise<{ [s: string]: boolean } | null>
    | Observable<{ [s: string]: boolean } | null> {
    const promise = new Promise<{ [s: string]: boolean } | null>(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === "test@test.com") {
            resolve({ emailIsForbidden: true });
          } else {
            resolve(null);
          }
        }, 1500);
      }
    );
    return promise;
  }
}

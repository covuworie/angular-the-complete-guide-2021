import { Component, ViewChild } from "@angular/core";
import { AbstractControl } from "@angular/forms";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  subscriptions = ["Basic", "Advanced", "Pro"];
  defaultSubscription = "Advanced";
  @ViewChild("appForm") appForm: NgForm;
  form = {
    email: "",
    subscription: "",
    password: "",
  };
  submitted = false;

  isInvalid(formOrControl: AbstractControl | NgForm) {
    return !formOrControl.valid && formOrControl.touched;
  }

  onSubmit() {
    this.submitted = true;
    this.form.email = this.appForm.value.email;
    this.form.subscription = this.appForm.value.subscription;
    this.form.password = this.appForm.value.password;
  }
}

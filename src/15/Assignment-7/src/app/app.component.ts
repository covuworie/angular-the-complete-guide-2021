import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  statuses = ["Stable", "Critical", "Finished"];
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      name: new FormControl(
        "",
        [Validators.required, this.isInvalidName],
        this.isInvalidNameAsync
      ),
      email: new FormControl("", [Validators.required, Validators.email]),
      status: new FormControl("Stable"),
    });
  }

  isInvalidName(control: FormControl): { [key: string]: boolean } {
    if (control.value === "Test") {
      return { nameIsInvalid: true };
    }
  }

  isInvalidNameAsync(
    control: FormControl
  ):
    | Promise<{ [s: string]: boolean } | null>
    | Observable<{ [s: string]: boolean } | null> {
    const promise = new Promise<{ [s: string]: boolean }>((resolve, _) => {
      setTimeout(() => {
        if (control.value === "Testproject") {
          resolve({ nameIsInvalid: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }
}

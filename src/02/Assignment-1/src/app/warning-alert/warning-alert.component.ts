import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-warning-alert",
  templateUrl: "./warning-alert.component.html",
  styleUrls: ["./warning-alert.component.css"],
})
export class WarningAlertComponent implements OnInit {
  message: string;
  constructor() {
    this.message = "Not completing this course is bad!";
  }

  ngOnInit(): void {}
}

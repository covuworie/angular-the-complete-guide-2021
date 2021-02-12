import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  message = "Secret Password = tuna";
  displayDetails = false;
  clickTimestamps: number[] = [];

  public onToggleDetails(event: Event) {
    const button = event.target as HTMLInputElement;
    button.textContent = this.displayDetails
      ? "Display Details"
      : "Hide Details";
    this.displayDetails = !this.displayDetails;
    this.clickTimestamps.push(Date.now());
  }
  public getBackgroundColor() {
    return this.clickTimestamps.length >= 5 ? "blue" : "white";
  }
}

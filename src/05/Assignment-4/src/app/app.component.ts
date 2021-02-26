import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  public onTimer(number: number) {
    if (number % 2 === 0) {
      this.evenNumbers.push(number);
      return;
    }
    this.oddNumbers.push(number);
  }
}

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAnimate() {
    this.state === "normal"
      ? (this.state = "highlighted")
      : (this.state = "normal");
  }

  onAdd(item: string) {
    this.list.push(item);
  }
}

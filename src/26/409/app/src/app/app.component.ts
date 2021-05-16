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
      transition("normal <=> highlighted", animate(300)),
      // transition("highlighted => normal", animate(800)),
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0) scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          transform: "translateX(0) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      // Note use of wildcard here from and to any state!
      transition("shrunken <=> *", [
        // Different phases in the transition:
        // Starting phase as no animate method is used (instantly applied)
        style({
          "background-color": "orange",
        }),
        // Animate applies style over some time interval
        animate(
          1000,
          style({
            borderRadius: "50px",
          })
        ),
        // Animate without a style transitions to the final state
        animate(500),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";
  list = ["Milk", "Sugar", "Bread"];

  onAnimate() {
    this.state === "normal"
      ? (this.state = "highlighted")
      : (this.state = "normal");
    this.wildState === "normal"
      ? (this.wildState = "highlighted")
      : (this.wildState = "normal");
  }

  onShrink() {
    this.wildState = "shrunken";
  }

  onAdd(item: string) {
    this.list.push(item);
  }
}

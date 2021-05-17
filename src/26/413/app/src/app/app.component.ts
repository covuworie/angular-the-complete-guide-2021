import {
  animate,
  AnimationTransitionMetadata,
  group,
  keyframes,
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
    trigger("list1", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      // void means the element was not initially in the DOM
      transition("void => *", [
        // initial style that is applied right at the start when the element is
        // appended to the DOM
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(300),
      ]),
      transition("* => void", [
        // final style that is applied right at the end when the element is
        // removed from the DOM
        animate(
          300,
          style({
            opacity: 0,
            transform: "translateX(100px)",
          })
        ),
      ]),
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      // void means the element was not initially in the DOM
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translate(-100px)",
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              // means we want to be at this point in animation at 0.3 x 1000 ms
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition("* => void", [
        // perform both animations synchronously
        group([
          // final style that is applied right at the end when the element is
          // removed from the DOM
          animate(
            300,
            style({
              color: "red",
            })
          ),
          animate(
            800,
            style({
              opacity: 0,
              transform: "translateX(100px)",
            })
          ),
        ]),
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

  onDelete(item: string) {
    this.list = this.list.filter((listItem, index) => {
      return listItem !== item;
    });
  }

  animationStarted(event: AnimationEvent) {
    console.log(event);
  }

  animationEnded(event: AnimationEvent) {
    console.log(event);
  }
}

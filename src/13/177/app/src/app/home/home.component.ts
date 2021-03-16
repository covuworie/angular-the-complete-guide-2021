import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  interval,
  Subscription,
  Observable,
  observable,
  Subscriber,
} from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObservableSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // this.firstObservableSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });
    const intervalObservable = new Observable(
      (observer: Subscriber<number>) => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 5) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error("Count is greater than 3!"));
          }
          count++;
        }, 1000);
      }
    );

    this.firstObservableSubscription = intervalObservable
      .pipe(
        filter((count: number) => {
          return count > 0;
        }),
        map((count: number) => {
          return `Round: ${++count}`;
        })
      )
      .subscribe(
        (count) => {
          console.log(count);
        },
        (error: Error) => {
          console.log(error);
          alert(error.message);
        },
        () => {
          console.log("Completed!");
        }
      );
  }

  ngOnDestroy() {
    this.firstObservableSubscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  interval,
  Subscription,
  Observable,
  observable,
  Subscriber,
} from "rxjs";

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
          count++;
        }, 1000);
      }
    );

    this.firstObservableSubscription = intervalObservable.subscribe((count) => {
      console.log(count);
    });
  }

  ngOnDestroy() {
    this.firstObservableSubscription.unsubscribe();
  }
}

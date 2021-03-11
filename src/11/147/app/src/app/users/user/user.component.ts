import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };
    // If the params of the current route can change then subscribe to an
    // Observable which updates the property values so that chages are
    // reflected in the template. If the component can never be reloaded from
    // within the component then this code would not be needed.
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }

  // In the previous lecture we did not have this code. We do not need it as Angular
  // by default unsubscribes to this route Observable when the component is destroyed.
  // The Observable no longer lives in memory. This is just to illustrate how to do
  // this for you own observables.
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

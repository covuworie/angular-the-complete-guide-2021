import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  private activatedSubscription: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activatedSubscription = this.userService.activatedEmitter.subscribe(
      (activated: boolean) => {
        this.userActivated = activated;
      }
    );
  }

  ngOnDestroy() {
    this.activatedSubscription.unsubscribe();
  }
}

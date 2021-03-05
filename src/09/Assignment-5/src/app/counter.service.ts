import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CounterService {
  activeToInactiveCounter: number = 0;
  inactiveToActiveCounter: number = 0;

  constructor() {}

  onSetToActive() {
    this.inactiveToActiveCounter++;
    console.log(
      `Number of inactive to active actions: ${this.inactiveToActiveCounter}`
    );
  }

  onSetToInactive() {
    this.activeToInactiveCounter++;
    console.log(
      `Number of active to inactive actions: ${this.activeToInactiveCounter}`
    );
  }
}

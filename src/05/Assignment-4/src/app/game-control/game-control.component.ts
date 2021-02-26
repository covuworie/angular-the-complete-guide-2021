import { Component, EventEmitter, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-game-control",
  templateUrl: "./game-control.component.html",
  styleUrls: ["./game-control.component.css"],
})
export class GameControlComponent implements OnInit {
  @Output() timer = new EventEmitter<number>();
  // Using the real type below leads to an error due to mixing of modules and
  // namespaces which is not recommended. Apparently an Observable timer would be
  // better here.
  interval: any; // NodeJS.Timeout;
  number: number = 0;

  constructor() {}

  ngOnInit(): void {}

  public onStartGame() {
    this.interval = setInterval(() => {
      this.timer.emit(this.number + 1);
      this.number++;
    }, 1000);
  }

  public onPauseGame() {
    clearInterval(this.interval);
  }
}

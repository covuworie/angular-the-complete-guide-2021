import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective {
  @HostBinding("style.backgroundColor") backgroundColor: string = "transparent";

  constructor() {}

  ngOnInit() {}

  @HostListener("mouseenter") mouseover(eventData: MouseEvent) {
    this.backgroundColor = "blue";
  }

  @HostListener("mouseleave") mouseleave(eventData: MouseEvent) {
    this.backgroundColor = "transparent";
  }
}

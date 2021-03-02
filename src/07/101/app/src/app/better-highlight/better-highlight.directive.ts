import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective {
  @Input() defaultColor: string = "transparent";
  // This is the default but the below (using an alias) also works. Useful if there
  // is only one directive property to bind to. See the alternative in the template.
  // @Input() higlightColor: string = "blue";
  @Input("appBetterHighlight") higlightColor: string = "blue";
  @HostBinding("style.backgroundColor") backgroundColor: string;

  constructor() {}

  ngOnInit() {
    this.backgroundColor = this.defaultColor;
  }

  @HostListener("mouseenter") mouseover(eventData: MouseEvent) {
    this.backgroundColor = this.higlightColor;
  }

  @HostListener("mouseleave") mouseleave(eventData: MouseEvent) {
    this.backgroundColor = this.defaultColor;
  }
}

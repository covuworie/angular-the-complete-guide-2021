import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // this.renderer.setStyle(
    //   this.element.nativeElement,
    //   "background-color", // "backgroundColor" also works
    //   "blue"
    // );
  }

  @HostListener('mouseenter') mouseover(eventData: MouseEvent) {
    this.renderer.setStyle(
      this.element.nativeElement,
      "background-color", // "backgroundColor" also works
      "blue"
    );
  }

  @HostListener('mouseleave') mouseleave(eventData: MouseEvent) {
    this.renderer.setStyle(
      this.element.nativeElement,
      "background-color", // "backgroundColor" also works
      "transparent"
    );
  }
}

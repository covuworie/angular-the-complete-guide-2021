import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appUnless]",
})
export class UnlessDirective {
  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.viewContainer.createEmbeddedView(this.template);
      return;
    }
    this.viewContainer.clear();
  }

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

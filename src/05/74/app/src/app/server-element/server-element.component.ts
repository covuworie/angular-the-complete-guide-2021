import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  // Emulated is default so no need to add it. But view encapsulation can be
  // overriden using these options. You probably don't want to do it though!
  encapsulation: ViewEncapsulation.Emulated, // None, ShadowDom
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: { type: string; name: string; content: string };

  constructor() {}

  ngOnInit(): void {}
}

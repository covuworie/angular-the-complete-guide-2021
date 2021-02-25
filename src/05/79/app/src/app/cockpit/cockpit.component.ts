import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{
    name: string;
    content: string;
  }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverContentElement', { static: true })
  serverContentElement: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnInit(): void {}

  public onAddServer(serverNameElement: HTMLInputElement) {
    this.serverCreated.emit({
      name: serverNameElement.value,
      content: (this.serverContentElement.nativeElement as HTMLInputElement)
        .value,
    });
  }

  public onAddBlueprint(serverNameElement: HTMLInputElement) {
    this.blueprintCreated.emit({
      name: serverNameElement.value,
      content: (this.serverContentElement.nativeElement as HTMLInputElement)
        .value,
    });
  }
}

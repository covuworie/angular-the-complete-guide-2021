import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // selector: '.app-servers',
  // template: ` <app-server></app-server>
  //   <app-server></app-server>`,
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = 'Test server';
  serverCreated = false;
  servers = ['Test server', 'Test server 2'];

  constructor() {
    setTimeout(() => (this.allowNewServer = true), 2000);
  }

  ngOnInit(): void {}

  public onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    // this.serverCreationStatus = `Server '${this.serverName}' was created!`;
  }

  public onUpdateServerName(event: InputEvent) {
    this.serverName = (event.target as HTMLInputElement).value;
  }
}

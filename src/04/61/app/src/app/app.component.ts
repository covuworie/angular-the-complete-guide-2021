import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  servers;
  // The line below fixes the error
  // servers: string[] = [];

  public onAddServer() {
    this.servers.push('Another server');
  }

  public onRemoveServer(id: number) {
    const position = id + 1;
    this.servers.splice(position, 1);
  }
}

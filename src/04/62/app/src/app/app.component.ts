import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  servers: string[] = [];

  public onAddServer() {
    this.servers.push('Another server');
  }

  public onRemoveServer(id: number) {
    // The bug here is a logical one. We cannot remove the last server when we
    // click on it. We can debug this in the browser developer tools under the
    // Sources tab as we have the line "sourceMap": true in the tsconfig.json file.
    const position = id + 1;
    this.servers.splice(position, 1);
  }
}

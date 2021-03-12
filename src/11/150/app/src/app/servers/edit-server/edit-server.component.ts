import { query } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable } from "rxjs";

import { ServersService } from "../servers.service";
import { CanComponentDeactivate } from "./can-deactivate-guard";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Works as long as params do not change in component after the initial loading
    console.log(this.route.snapshot.queryParams);
    console.log(this.route.snapshot.fragment);
    // Observables that are reactive to changes in query params and fragments
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams["allowEdit"] === "1" ? true : false;
    });
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params["id"];
    this.server = this.serversService.getServer(id);
    // Subscribe route params to update the id if params change
    this.route.params.subscribe((params: Params) => {
      this.server = this.serversService.getServer(+params["id"]);
    });
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }
    const serverChanged =
      this.serverName !== this.server.name ||
      this.serverStatus !== this.server.status;
    if (serverChanged && !this.changesSaved) {
      return confirm("Do you want to discard the changes?");
    }
    return true;
  }
}

import { Pipe, PipeTransform } from "@angular/core";

interface Server {
  instanceType: string;
  name: string;
  status: string;
  started: Date;
}

type Order = "ascending" | "descending";

@Pipe({
  name: "sort",
  pure: false,
})
export class SortPipe implements PipeTransform {
  transform(servers: Server[], propertyName: string, order: Order) {
    const sortedServers = servers.sort((serverA: Server, serverB: Server) => {
      if (serverA[propertyName] < serverB[propertyName]) {
        return order === "ascending" ? -1 : 1;
      } else if (serverA[propertyName] > serverB[propertyName]) {
        return order === "ascending" ? 1 : -1;
      }
      return 0;
    });
    return sortedServers;
  }
}

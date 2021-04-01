import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "reverse",
})
export class ReversePipe implements PipeTransform {
  transform(value: string) {
    const reversed = value.split("").reverse().join("");
    return reversed;
  }
}

import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "filter",
})
export class FilterPipe implements PipeTransform {
  transform(value: any[], filterString: string, propertyName: string) {
    if (value.length === 0 || filterString === "") {
      return value;
    }
    const filteredValues = [];
    for (const val of value) {
      if (val[propertyName] === filterString) {
        filteredValues.push(val);
      }
    }
    return filteredValues;
  }
}

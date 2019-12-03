import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'filterOnId'})
export class FilterOnIdPipe implements PipeTransform {
  transform(list: any[], acceptId: number) {
    return list.find(item => item.id === acceptId);
  }
}

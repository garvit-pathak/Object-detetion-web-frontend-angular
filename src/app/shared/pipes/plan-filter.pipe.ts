import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'planFilter',
  pure:false
})
export class PlanFilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any {
    if (!items || !filter) {
        return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.plan_type.indexOf(filter.plan_type) !== -1);
}

}
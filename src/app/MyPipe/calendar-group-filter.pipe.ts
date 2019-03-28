import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calendarGroupFilter'
})
export class CalendarGroupFilterPipe implements PipeTransform {
  filtredGroup: any[] = [];
  transform(groupName: any, selectGroups?: any): any {
    if (groupName.length === 0 || selectGroups.length === 0) {
      return groupName;
    }
    this.filtredGroup = [];
    for (const name of groupName) {
      for (const group of selectGroups) {
        if (name.name === group) {
          console.log('calendarGroupFilter');
          this.filtredGroup.push(name);
        }
      }
    }
    console.log(this.filtredGroup);
    return this.filtredGroup;
  }

}

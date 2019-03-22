import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'groupFilter'
})
export class GroupFilter implements PipeTransform {
    transform(value: any, args?: any[]) {
        value = moment(value).format('MMM-DD');
        return value;
    }

}

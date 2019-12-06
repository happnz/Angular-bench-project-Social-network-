import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(date: Date | string): string {
    if (typeof date === 'string') {
      date = new Date(Date.parse(date));
    }
    const currentDate = new Date();
    const showDate = currentDate.getDate() !== date.getDate();
    const showYear = currentDate.getFullYear() !== date.getFullYear();

    let hours;
    if (date.getHours() < 10) {
      hours = '0' + date.getHours();
    } else {
      hours = date.getHours();
    }

    let minutes;
    if (date.getMinutes() < 10) {
      minutes = '0' + date.getMinutes();
    } else {
      minutes = date.getMinutes();
    }

    let res = `${hours}:${minutes}`;

    if (showDate) {
      res += ' ' + date.getDate();
      res += '.' + (date.getMonth() + 1);

      if (showYear) {
        res += '.' + date.getFullYear();
      }
    } else {
      res = 'Today at ' + res;
    }

    return res;
  }

}

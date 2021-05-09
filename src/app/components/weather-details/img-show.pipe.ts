import { Pipe, PipeTransform } from '@angular/core';
export const ICON_PATH = `https://developer.accuweather.com/sites/default/files`;
@Pipe({
  name: 'currentImgIcon'
})
export class showCurrentImgPipe implements PipeTransform {
  transform(value: any): any {
    if (value < 10) {
      value = `0${value}`;
    }
    return `${ICON_PATH}/${value}-s.png`;
  }
}
import { Pipe } from "@angular/core";

@Pipe({
  name: 'customUpperCase',
  standalone: true
})

export class CustomUpperCasePipe {
  transform(value: string | undefined) {
    if(value !== undefined && value.length > 0) {
      return value.trim().toUpperCase();
    } else return '';
  } 
}
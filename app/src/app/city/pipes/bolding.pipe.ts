import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bolding'
})
export class BoldingPipe implements PipeTransform {

  transform(value: string | undefined, text: string): string {
    return value ? value.replace(new RegExp(text, 'gi'), "<strong>$&</strong>") : '';
  }
}

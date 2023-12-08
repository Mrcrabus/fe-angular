import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../models/post';

@Pipe({
  name: 'filterProducts'
})
export class FilterPostsPipe implements PipeTransform {

  public transform(products: Post[], search: string): Post[] {
    if(search.length === 0) return  products;
    return products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  }

}

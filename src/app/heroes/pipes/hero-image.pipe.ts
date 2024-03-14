import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform( hero: Hero ): string {

    if ( !hero.id && !hero.alt_mg ) {
      return 'assets/no-image.png';
    }

    if ( hero.alt_mg ) return hero.alt_mg; // https:///google.com/flash.png

    return `assets/heroes/${ hero.id }.jpg`;

  }

}
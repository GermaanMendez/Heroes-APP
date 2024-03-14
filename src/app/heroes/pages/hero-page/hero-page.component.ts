import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrl: './hero-page.component.css'
})
export class HeroPageComponent implements OnInit{

  public hero?:Hero;
  private heroesService:HeroesService;
  private activatedRoute:ActivatedRoute;
  private router:Router;

  constructor(heroesService:HeroesService, activatedRoute:ActivatedRoute,router:Router){
    this.heroesService=heroesService;
    this.activatedRoute = activatedRoute;
    this.router = router;
  }

  //activatedRoute me permite acceder a la ruta activa que en este caso sabemos que este
  //componente se ejecutara solo cuando se quiere acceder a la pagina de detalles de un hero
  
  //switchmap me permite acceder y manipular los parametros de la url
  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      delay(1000),
      switchMap(({id}) => this.heroesService.getHeroeById(id)),
    ).subscribe(hero =>{
      if(!hero) return this.router.navigate(['/heroes/list']);
      this.hero = hero;
      console.log(hero)
      return;
    })
    
  }


  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }


}

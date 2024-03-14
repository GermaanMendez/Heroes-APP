import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {
    private baseUrl:string = environments.baseUrl;
    public httpclient : HttpClient;
    constructor(httpClient: HttpClient) {
        this.httpclient = httpClient;
    }
    
    getHeroes():Observable<Hero[]>{

        return this.httpclient.get<Hero[]>(`${this.baseUrl}/heroes`);
    }

    getHeroeById(id:string):Observable<Hero | undefined>{

        //off sirve para crear observable basdos en un valor, en este caso undefined
        return this.httpclient.get<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
            catchError( error => of(undefined) )
        )
    }
}
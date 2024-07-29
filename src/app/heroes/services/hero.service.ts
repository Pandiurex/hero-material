import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.i';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private baseUrl: string = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {}

  getHero(): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById(id: string) {
    return this.httpClient
      .get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.httpClient.get<Hero[]>(
      `${this.baseUrl}/heroes?q=${query}&_limit=6`
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.baseUrl}/heroes`, hero);
  }
  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) throw Error('Hero id is required');

    return this.httpClient.patch<Hero>(
      `${this.baseUrl}/heroes/${hero.id}`,
      hero
    );
  }
  deleteHeroById(id: string): Observable<boolean> {
    return this.httpClient.delete<Hero>(`${this.baseUrl}/heroes/${id}`).pipe(
      map((resp) => true),
      catchError((err) => of(false))
    );
  }
}

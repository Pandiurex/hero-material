import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero.i';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrl: './list-page.component.css',
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHero().subscribe((heroes) => (this.heroes = heroes));
  }
}

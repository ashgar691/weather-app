import { Favorite } from './../../store/weather.reducer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Weather } from 'src/app/models/weather';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(private favoritesService: FavoritesService
  ) { }

  public favoritesArray: any = [];

  ngOnInit(): void {
    this.favoritesArray = this.favoritesService.getFavorites();
  }

  locationClicked(location: Favorite) {
    this.favoritesService.locationClicked(location);


  }

}

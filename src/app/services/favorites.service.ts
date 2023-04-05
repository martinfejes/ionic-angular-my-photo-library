import { Injectable } from '@angular/core';
import { Photo } from '@models/photo';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesKey = 'my-photo-library-favorites';

  constructor() {}

  getAll(): Photo[] {
    const favoritesJson = localStorage.getItem(this.favoritesKey);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  }

  addFavorite(photo: Photo) {
    if (this.isFavorite(photo.id)) {
      return;
    }

    const favorites = this.getAll();
    favorites.push(photo);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  removeFavorite(id: string) {
    if (!this.isFavorite(id)) {
      return;
    }

    const favorites = this.getAll().filter((f) => f.id !== id);
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
  }

  isFavorite(id: string) {
    const favoritePhoto = this.getAll().find((f) => f.id === id);
    return !!favoritePhoto;
  }
}

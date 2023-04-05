import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { PageHeaderComponent } from '@components';
import { FavoritesService } from '@services/favorites.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, PageHeaderComponent],
})
export class DetailPage {
  photoId!: string;
  imageUrl!: string;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private favoritesService: FavoritesService,
  ) {}

  ionViewWillEnter(): void {
    this.photoId = this.route.snapshot.paramMap.get('id') || '';
    this.imageUrl = `${environment.imageUrl}/id/${this.photoId}/800`;
    this.setIsFavorite();
  }

  removeFromFavorites(): void {
    this.favoritesService.removeFavorite(this.photoId);
    this.setIsFavorite();
  }

  setIsFavorite(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.photoId);
  }
}

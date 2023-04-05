import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '@models/photo';
import { PhotosService } from '@services/photos.service';
import { FavoritesService } from '@services/favorites.service';
import { PageHeaderComponent, PhotoCardComponent } from '@components';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.page.html',
  styleUrls: ['./photos.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PageHeaderComponent,
    PhotoCardComponent,
  ],
})
export class PhotosPage implements OnInit {
  loading = false;
  photos: Photo[] = [];
  page = 1;

  constructor(
    private photosService: PhotosService,
    private favoritesService: FavoritesService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((_) => {
      this.photos = [];
      this.loadPhotos(1);
    });
  }

  loadPhotos(page: number, event?: any): void {
    if (this.loading) {
      event?.target.complete();
      return;
    }

    this.loading = true;
    this.photosService.getPhotos(page).subscribe((photos) => {
      this.photos = [...this.photos, ...photos];
      this.loading = false;
      this.page = page + 1;
      event?.target.complete();
    });
  }

  addToFavorites(photo: Photo): void {
    this.favoritesService.addFavorite(photo);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Photo } from '@models/photo';
import { FavoritesService } from '@services/favorites.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageHeaderComponent, PhotoCardComponent } from '@components';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    PhotoCardComponent,
    PageHeaderComponent,
  ],
})
export class FavoritesPage implements OnInit {
  photos!: Photo[];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((_) => {
      this.photos = [];
      this.getPhotos();
    });
  }

  getPhotos(): void {
    const photos = this.favoritesService.getAll();
    this.photos = photos;
  }

  openDetail(photo: Photo): void {
    this.router.navigateByUrl(`/detail/${photo.id}`);
  }
}

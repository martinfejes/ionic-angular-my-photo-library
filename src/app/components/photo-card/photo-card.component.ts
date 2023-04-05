import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Photo } from '@models/photo';
import { FavoritesService } from '@services/favorites.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class PhotoCardComponent implements OnInit {
  @Input() photo!: Photo;
  @Output() onClick = new EventEmitter<string>();

  imageUrl: string = '';
  isFavorite: boolean = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.setImageUrl();
    this.setIsFavorite();
  }

  handleClick(): void {
    this.onClick.emit();
    this.setIsFavorite();
  }

  setIsFavorite(): void {
    this.isFavorite = this.favoritesService.isFavorite(this.photo.id);
  }

  setImageUrl(): void {
    this.imageUrl = `${environment.imageUrl}/id/${this.photo?.id}/500/500`;
  }
}

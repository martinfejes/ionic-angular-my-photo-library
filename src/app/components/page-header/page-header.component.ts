import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TActiveType } from './page-header.types';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class PageHeaderComponent {
  @Input() activePage!: TActiveType;

  constructor(private router: Router) {}

  goToPhotos(): void {
    this.router.navigateByUrl('/');
  }

  goToFavorites(): void {
    this.router.navigateByUrl('/favorites');
  }
}

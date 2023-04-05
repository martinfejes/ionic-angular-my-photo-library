import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '@services/favorites.service';
import { DetailPage } from './detail.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('DetailPage', () => {
  let component: DetailPage;
  let fixture: ComponentFixture<DetailPage>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'isFavorite',
      'removeFavorite',
    ]);
    favoritesServiceSpy.isFavorite.and.returnValue(true);
    favoritesServiceSpy.removeFavorite.and.returnValue(true);
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), CommonModule, FormsModule, DetailPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        { provide: FavoritesService, useValue: favoritesServiceSpy },
      ],
    }).compileComponents();
    favoritesService = TestBed.inject(
      FavoritesService,
    ) as jasmine.SpyObj<FavoritesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the photoId property from the route parameter', () => {
    component.ionViewWillEnter();
    expect(component.photoId).toEqual('1');
  });

  it('should set the imageUrl property based on the photoId', () => {
    component.ionViewWillEnter();
    expect(component.imageUrl).toEqual('https://picsum.photos/id/1/800');
  });
});

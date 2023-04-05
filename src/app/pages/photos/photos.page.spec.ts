import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { PhotosService } from '@services/photos.service';
import { FavoritesService } from '@services/favorites.service';
import { PhotosPage } from './photos.page';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PhotosPage', () => {
  let component: PhotosPage;
  let fixture: ComponentFixture<PhotosPage>;
  let photosServiceSpy: jasmine.SpyObj<PhotosService>;
  let favoritesServiceSpy: jasmine.SpyObj<FavoritesService>;
  const mockPhotos = [
    {
      id: '1',
      author: 'John Doe',
      width: 100,
      height: 100,
      url: 'test',
      download_url: 'test',
    },
    {
      id: '2',
      author: 'Jane Doe',
      width: 200,
      height: 200,
      url: 'test',
      download_url: 'test',
    },
    {
      id: '3',
      author: 'John Smith',
      width: 300,
      height: 300,
      url: 'test',
      download_url: 'test',
    },
  ];

  beforeEach(waitForAsync(() => {
    const photosService = jasmine.createSpyObj('PhotosService', ['getPhotos']);
    const favoritesService = jasmine.createSpyObj('FavoritesService', [
      'addFavorite',
      'isFavorite',
    ]);

    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), PhotosPage],
      providers: [
        { provide: PhotosService, useValue: photosService },
        { provide: FavoritesService, useValue: favoritesService },
        { provide: ActivatedRoute, useValue: { params: of({}) } },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    photosServiceSpy = TestBed.inject(
      PhotosService,
    ) as jasmine.SpyObj<PhotosService>;
    favoritesServiceSpy = TestBed.inject(
      FavoritesService,
    ) as jasmine.SpyObj<FavoritesService>;
    photosServiceSpy.getPhotos.and.returnValue(of(mockPhotos));
    fixture = TestBed.createComponent(PhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load photos on init', () => {
    expect(photosServiceSpy.getPhotos).toHaveBeenCalledWith(1);
    expect(component.photos).toEqual(mockPhotos);
  });

  it('should load more photos when scrolled to the bottom', () => {
    component.loadPhotos(2);
    expect(photosServiceSpy.getPhotos).toHaveBeenCalledWith(2);
    expect(component.photos.length).toBe(6);
  });

  it('should add photo to favorites', () => {
    const photo = mockPhotos[0];
    component.addToFavorites(photo);
    expect(favoritesServiceSpy.addFavorite).toHaveBeenCalledWith(photo);
  });
});

import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Photo } from '../models/photo';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const mockPhoto: Photo = {
    id: '1',
    author: 'John Doe',
    width: 800,
    height: 600,
    url: 'https://picsum.photos/id/1/800/600',
    download_url: 'https://picsum.photos/id/1/800/600',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesService],
    });
    service = TestBed.inject(FavoritesService);
    localStorage.removeItem('my-photo-library-favorites');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should return an empty array when there are no favorites', () => {
      expect(service.getAll()).toEqual([]);
    });

    it('should return an array of favorites', () => {
      localStorage.setItem(
        'my-photo-library-favorites',
        JSON.stringify([mockPhoto]),
      );
      expect(service.getAll()).toEqual([mockPhoto]);
    });
  });

  describe('addFavorite', () => {
    it('should add a favorite to localStorage', () => {
      service.addFavorite(mockPhoto);
      expect(localStorage.getItem('my-photo-library-favorites')).toEqual(
        JSON.stringify([mockPhoto]),
      );
    });

    it('should not add a duplicate favorite to localStorage', () => {
      localStorage.setItem(
        'my-photo-library-favorites',
        JSON.stringify([mockPhoto]),
      );
      service.addFavorite(mockPhoto);
      expect(localStorage.getItem('my-photo-library-favorites')).toEqual(
        JSON.stringify([mockPhoto]),
      );
    });
  });

  describe('removeFavorite', () => {
    it('should remove a favorite from localStorage', () => {
      localStorage.setItem(
        'my-photo-library-favorites',
        JSON.stringify([mockPhoto]),
      );
      service.removeFavorite('1');
      expect(localStorage.getItem('my-photo-library-favorites')).toEqual(
        JSON.stringify([]),
      );
    });

    it('should not remove a non-existent favorite from localStorage', () => {
      localStorage.setItem(
        'my-photo-library-favorites',
        JSON.stringify([mockPhoto]),
      );
      service.removeFavorite('2');
      expect(localStorage.getItem('my-photo-library-favorites')).toEqual(
        JSON.stringify([mockPhoto]),
      );
    });
  });

  describe('isFavorite', () => {
    it('should return true when the photo is a favorite', () => {
      localStorage.setItem(
        'my-photo-library-favorites',
        JSON.stringify([mockPhoto]),
      );
      expect(service.isFavorite('1')).toBeTrue();
    });

    it('should return false when the photo is not a favorite', () => {
      localStorage.setItem(
        'my-photo-library-favorites',
        JSON.stringify([mockPhoto]),
      );
      expect(service.isFavorite('2')).toBeFalse();
    });
  });
});

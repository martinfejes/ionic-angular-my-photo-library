import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Photo } from '@models/photo';
import { FavoritesService } from '@services/favorites.service';
import { PhotoCardComponent } from './photo-card.component';

describe('PhotoCardComponent', () => {
  let component: PhotoCardComponent;
  let fixture: ComponentFixture<PhotoCardComponent>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'isFavorite',
    ]);
    await TestBed.configureTestingModule({
      imports: [IonicModule, PhotoCardComponent],
      providers: [{ provide: FavoritesService, useValue: favoritesServiceSpy }],
    }).compileComponents();
    favoritesService = TestBed.inject(
      FavoritesService,
    ) as jasmine.SpyObj<FavoritesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoCardComponent);
    component = fixture.componentInstance;
    component.photo = {
      id: '1',
      author: 'John Doe',
      width: 500,
      height: 500,
      url: '',
      download_url: '',
    } as Photo;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onClick event when clicked', () => {
    spyOn(component.onClick, 'emit');
    component.handleClick();
    expect(component.onClick.emit).toHaveBeenCalled();
  });

  it('should call favoritesService.isFavorite when setIsFavorite is called', () => {
    favoritesService.isFavorite.and.returnValue(true);
    component.setIsFavorite();
    expect(favoritesService.isFavorite).toHaveBeenCalledWith('1');
    expect(component.isFavorite).toBeTrue();
  });

  it('should set the image URL when setImageUrl is called', () => {
    component.setImageUrl();
    expect(component.imageUrl).toEqual('https://picsum.photos/id/1/500/500');
  });
});

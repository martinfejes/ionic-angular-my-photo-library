import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FavoritesService } from '@services/favorites.service';
import { FavoritesPage } from './favorites.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('FavoritesPage', () => {
  let component: FavoritesPage;
  let fixture: ComponentFixture<FavoritesPage>;
  let favoritesService: jasmine.SpyObj<FavoritesService>;

  beforeEach(async () => {
    const favoritesServiceSpy = jasmine.createSpyObj('FavoritesService', [
      'getAll',
    ]);
    await TestBed.configureTestingModule({
      imports: [IonicModule.forRoot(), FavoritesPage],
      providers: [
        { provide: FavoritesService, useValue: favoritesServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    }).compileComponents();
    favoritesService = TestBed.inject(
      FavoritesService,
    ) as jasmine.SpyObj<FavoritesService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesPage);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get all favorite photos from the FavoritesService', () => {
    const mockPhotos = [
      {
        id: '1',
        author: 'John Doe',
        width: 800,
        height: 600,
        url: 'https://picsum.photos/id/1/800/600',
        download_url: 'https://picsum.photos/id/1/800/600',
      },
      {
        id: '2',
        author: 'Jane Doe',
        width: 800,
        height: 600,
        url: 'https://picsum.photos/id/2/800/600',
        download_url: 'https://picsum.photos/id/2/800/600',
      },
    ];
    favoritesService.getAll.and.returnValue(mockPhotos);
    component.ngOnInit();
    expect(favoritesService.getAll).toHaveBeenCalled();
    expect(component.photos).toEqual(mockPhotos);
  });

  it('should navigate to the detail page when a photo is clicked', () => {
    const mockPhoto = {
      id: '1',
      author: 'John Doe',
      width: 800,
      height: 600,
      url: 'https://picsum.photos/id/1/800/600',
      download_url: 'https://picsum.photos/id/1/800/600',
    };
    spyOn(component['router'], 'navigateByUrl');
    component.openDetail(mockPhoto);
    expect(component['router'].navigateByUrl).toHaveBeenCalledWith('/detail/1');
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { PageHeaderComponent } from './page-header.component';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, PageHeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /photos when goToPhotos is called', () => {
    spyOn(router, 'navigateByUrl');
    component.goToPhotos();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/');
  });

  it('should navigate to /favorites when goToFavorites is called', () => {
    spyOn(router, 'navigateByUrl');
    component.goToFavorites();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/favorites');
  });
});

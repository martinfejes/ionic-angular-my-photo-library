import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;

  const routes: Routes = [
    {
      path: '',
      redirectTo: 'photos',
      pathMatch: 'full',
    },
    {
      path: 'photos',
      component: PageHeaderComponent,
      children: [],
    },
    {
      path: 'favorites',
      component: PageHeaderComponent,
      children: [],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        AppComponent,
        PageHeaderComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});

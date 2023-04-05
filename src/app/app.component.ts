import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { TActiveType } from './components/page-header/page-header.types';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, PageHeaderComponent],
})
export class AppComponent implements OnInit {
  currentChildRoute!: TActiveType;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map(() => this.route.firstChild),
      )
      .subscribe((child: ActivatedRoute | null) => {
        this.currentChildRoute = child?.routeConfig?.path as TActiveType;
      });
  }
}

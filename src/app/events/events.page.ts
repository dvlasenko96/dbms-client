import { Component, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { RouterPage } from '../router-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import { List } from '@ionic/angular';

@Component({
  selector: 'app-events',
  templateUrl: 'events.page.html',
  styleUrls: ['events.page.scss']
})
export class EventsPage extends RouterPage {
  @ViewChild('slidingList') public slidingList: List;
  
  public events = [];
  public err;

  constructor(
    private _http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super(router, route);
  }

  onEnter() {
    this._initEvents();
  }

  public delete(event, i) {
    this.slidingList.closeSlidingItems();
    const url = `${environment.API_URL}/events/${event.id}`;
    this._http.delete(url)
      .pipe(take(1))
      .subscribe((events: any[]) => {
        this.events.splice(i, 1);
        console.log(events);
      });
  }

  private _initEvents() {
    const url = `${environment.API_URL}/events/`;
    this._http.get(url)
      .pipe(take(1))
      .subscribe((events: any[]) => {
        this.events = events;
        console.log(events);
      }, err => {
        this.err = err;
        console.error(err);
      });
  }
}

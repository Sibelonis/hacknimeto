import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css'],
})
export class GoogleMapsComponent implements OnInit {
  apiLoaded$: Observable<boolean>;
  isApiLoaded = false; // variable to store the result of apiLoaded$ observable
  chargers: any[] = [];
  markers: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  center = { lat: 48.9974, lng: 21.2394 };
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: 'assets/icons/pin_icon.png',
    },
  };

  constructor(
    httpClient: HttpClient,
    private FirebaseService: FirebaseService,
    private router: Router,
  ) {
    this.apiLoaded$ = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyCRCwW5TT9tjjYNwnp9RvRXzotMlM4ZN0s',
        'callback',
      )
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );

    // subscribe to apiLoaded$ observable and store the result in isApiLoaded variable
    this.apiLoaded$.subscribe((isLoaded) => {
      this.isApiLoaded = isLoaded;
    });
  }

  onMarkerClick(chargerId: string) {
    console.log(chargerId);
    this.router.navigate(['/reservation', chargerId]);
  }

  private loadData() {
    this.FirebaseService.getData('chargers').subscribe((data: any[]) => {
      this.chargers = data;
      this.chargers.forEach((charger) => {
        this.markers.push({
          id: charger.id,
          position: {
            lat: charger.coordinates._lat,
            lng: charger.coordinates._long,
          },
        });
      });
    });
  }
}

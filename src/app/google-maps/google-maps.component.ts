import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class GoogleMapsComponent {
  apiLoaded: Observable<boolean>;

  center = {lat: 48.9974, lng: 21.2394};  // Koordináty pre Prešov
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: 'assets/icons/pin_icon.png',
    },
  };
  markerPositions: google.maps.LatLngLiteral[] = [ {lat: 48.9974, lng: 21.2394}, ];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCRCwW5TT9tjjYNwnp9RvRXzotMlM4ZN0s', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}

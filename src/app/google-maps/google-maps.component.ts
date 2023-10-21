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
  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: true // Hide default UI elements (buttons)
    // Add any other map options as needed
  };


  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: 'assets/icons/pin_icon.png',
    },
  };
  markerPositions: google.maps.LatLngLiteral[] = [ {lat: 48.9974, lng: 21.2394},
    {lat:49.017299,lng:21.229549},
    {lat:49.018349,lng:21.223800},
    {lat:48.975329,lng:21.262033},
    {lat:48.999202,lng:21.270453}];

  constructor(httpClient: HttpClient) {
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyCRCwW5TT9tjjYNwnp9RvRXzotMlM4ZN0s', 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  chargerId: string | null = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.chargerId = this.route.snapshot.paramMap.get('chargerId');
    console.log(this.chargerId);
  }
}

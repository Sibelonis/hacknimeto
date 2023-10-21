import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgForOf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgForOf,
    MatRadioModule,
    FormsModule,
  ],
})
export class ReservationComponent implements OnInit {
  chargerId: string | null = '';
  timeSlots: string[] = [];
  selectedTimeSlot: string | null = null;
  occupiedTimes: string[] = [];

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
  ) {}

  ngOnInit() {
    this.chargerId = this.route.snapshot.paramMap.get('chargerId');
    console.log(this.chargerId);
  }

  generateTimeSlots(date: Date) {
    this.timeSlots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const start = `${hour.toString().padStart(2, '0')}:${minute
          .toString()
          .padStart(2, '0')}`;
        const endHour = minute === 30 ? (hour === 23 ? 0 : hour + 1) : hour;
        const endMinute = minute === 0 ? 30 : 0;
        const end = `${endHour.toString().padStart(2, '0')}:${endMinute
          .toString()
          .padStart(2, '0')}`;
        const interval = `${start}-${end}`;
        this.timeSlots.push(interval);
      }
    }
    console.log(this.timeSlots); // Log the generated time slots
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    const selectedDate = event.value;
    if (selectedDate) {
      this.generateTimeSlots(selectedDate);
      this.fetchOccupiedTimes(selectedDate);
    }
  }

  fetchOccupiedTimes(date: Date) {
    const dateString = date.toISOString().split('T')[0];
    console.log(dateString);
    this.firestore
      .collection('chargers')
      .doc(this.chargerId)
      .collection('occupied')
      .doc(dateString)
      .get()
      .subscribe((doc) => {
        console.log(doc);
        if (doc.exists) {
          this.occupiedTimes = doc.data()?.occupied || [];
        } else {
          this.occupiedTimes = [];
        }
      });
  }
}

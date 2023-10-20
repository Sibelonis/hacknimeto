import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../firebase.service";

@Component({
  selector: 'app-first-view',
  templateUrl: './first-view.component.html',
  styleUrls: ['./first-view.component.css']
})
export class FirstViewComponent implements OnInit {
  users: any[] = [];
  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.firebaseService.getData('test').subscribe((data: any[]) => {
      this.users = data;
      });
  }
}

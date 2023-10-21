import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private router:Router) {
  }

  home(){
    this.router.navigate(["/"]);
  }

  signup(){
    this.router.navigate(["/register-user"]);
  }
  signin(){
    this.router.navigate(["/sign-in"]);
  }
}

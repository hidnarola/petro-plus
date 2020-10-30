import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router) {
    setTimeout(() => {

      this.route.navigate(['/sign_in']);
    }, 3000);
  }

  ngOnInit(): void {
  }

}

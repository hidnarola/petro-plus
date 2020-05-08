import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PetroPlus';

  constructor(
    private swUpdate: SwUpdate
  ) { }

  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        console.log('service updated => ');
        if (confirm('New version available, Load new version ?')) {
          console.log('condition true => ');
          window.location.reload();
        }
      });
    }
  }

}

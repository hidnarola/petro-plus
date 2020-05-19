import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-site-map-view',
  templateUrl: './site-map-view.component.html',
  styleUrls: ['./site-map-view.component.scss']
})
export class SiteMapViewComponent implements OnInit {

  options: any;

  overlays: any[];
  lat = 40.730610;
  lng = -73.935242;

  constructor(
    private dataShareService: DataShareService
  ) {
    this.dataShareService.manageIsCurrentLocation.subscribe(res => {
      console.log('res => ', res);
      if (res && res.isCurrentLocation) {
        if (navigator) {
          navigator.geolocation.getCurrentPosition(pos => {
            console.log('pos => ', pos);
            this.lng = +pos.coords.longitude;
            this.lat = +pos.coords.latitude;
          });
        }
      } else {
        this.lat = 40.730610;
        this.lng = -73.935242;
      }
    });

  }

  ngOnInit() {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
  }

}

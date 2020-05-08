import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
  }

}

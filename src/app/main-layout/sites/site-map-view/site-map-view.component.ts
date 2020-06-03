import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-site-map-view',
  templateUrl: './site-map-view.component.html',
  styleUrls: ['./site-map-view.component.scss']
})
export class SiteMapViewComponent implements OnInit {

  options: any;
  siteList = [];
  overlays: any[];
  lat;
  lng;

  markers = [];

  constructor(
    private dataShareService: DataShareService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.siteList = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    this.siteList.map(ele => {
      this.markers.push({ lat: ele.Latitude._text, lng: ele.Longitude._text, label: ele.SiteName._text, Id: ele.SiteID._text });
    });
    this.dataShareService.manageIsCurrentLocation.subscribe(res => {
      if (res && res.isCurrentLocation) {
        if (navigator) {
          navigator.geolocation.getCurrentPosition(pos => {
            this.lng = +pos.coords.longitude;
            this.lat = +pos.coords.latitude;
          });
        }
      } else {
        this.lat = Number(this.siteList[0].Latitude._text);
        this.lng = Number(this.siteList[0].Longitude._text);
      }
    });

    this.spinner.hide();
  }

  ngOnInit() {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
  }

  // on click of marker
  clickedMarker(id) {
    this.dataShareService.setMarkedSiteDetail({ isMarked: true, siteId: id });
  }

}

// Markes interface
// interface Marker {
//   lat: number;
//   lng: number;
//   label?: string;
// }

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
    console.log('siteList => ', this.siteList);
    console.log(' this.siteList[0].Latitude._text => ', this.siteList[0].Latitude._text);
    console.log(' this.siteList[0].Longitude._text => ', Number(this.siteList[0].Longitude._text));
    console.log(' this.siteList[0].Latitude._text type of => ', typeof (this.siteList[0].Latitude._text));
    console.log(' this.siteList[0].Longitude._text type of => ', typeof (Number(this.siteList[0].Longitude._text)));
    this.siteList.map(ele => {
      console.log('ele => ', ele);
      this.markers.push({ lat: ele.Latitude._text, lng: ele.Longitude._text, label: ele.SiteName._text, Id: ele.SiteID._text });
    });
    console.log('this.markers => ', this.markers);
    this.dataShareService.manageIsCurrentLocation.subscribe(res => {
      // console.log('res => ', res);
      if (res && res.isCurrentLocation) {
        if (navigator) {
          navigator.geolocation.getCurrentPosition(pos => {
            // console.log('pos => ', pos);
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
    console.log('Marker clicked => ', id);
    this.dataShareService.setMarkedSiteDetail({ isMarked: true });
  }

}

// Markes interface
// interface Marker {
//   lat: number;
//   lng: number;
//   label?: string;
// }

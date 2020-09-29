import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.scss']
})
export class MapOptionsComponent implements OnInit {
  checked: boolean = true;
  isMap = false;
  isSatellite = false;
  isTransit = false;
  constructor(
    private dataShareService: DataShareService
  ) {
    this.isMap = true;
  }

  ngOnInit(): void {
  }

  closePopup() {
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
    this.dataShareService.manageCurrentLocationIcon({ currentLocationIcon: true });
  }

  selectOption(key) {

    if (key === 1) {
      this.isMap = true;
      this.isTransit = false;
      this.isSatellite = false;
    } else if (key === 2) {
      this.isSatellite = true;
      this.isMap = false;
      this.isTransit = false;
    } else if (key === 3) {
      this.isTransit = true;
      this.isMap = false;
      this.isSatellite = false;
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-map-options',
  templateUrl: './map-options.component.html',
  styleUrls: ['./map-options.component.scss']
})
export class MapOptionsComponent implements OnInit {
  checked: boolean = true;

  constructor(
    private dataShareService: DataShareService
  ) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
  }

}

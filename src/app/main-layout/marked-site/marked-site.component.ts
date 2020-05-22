import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-marked-site',
  templateUrl: './marked-site.component.html',
  styleUrls: ['./marked-site.component.scss']
})
export class MarkedSiteComponent implements OnInit {

  constructor(
    private dataShareService: DataShareService
  ) { }

  ngOnInit(): void {
  }

  closeMarkedSite() {
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
  }

}

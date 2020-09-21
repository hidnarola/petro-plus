import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  userData;

  constructor(
    private service: CrudService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    const body = `StrCustomer=${this.userData.CustomerID._text}&` +
      `Status=${2}&` +
      `strToken=${this.userData.TokenID._text}&`;
    // this.service.post('CheckOrderStatus', body).subscribe(res => {
    //   console.log('res :: check for Order history => ', res);
    //   const data = this.commonService.XMLtoJson(res);
    //   console.log('data :: Json format :: All Orders=> ', data);
    //   this.spinner.hide();
    // });

  }

  ngOnInit(): void {
  }

}

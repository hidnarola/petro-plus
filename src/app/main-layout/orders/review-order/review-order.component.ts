import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/shared/data-share.service';
import { CrudService } from 'src/app/shared/crud.service';
import * as moment from 'moment';
import { CommonService } from 'src/app/shared/common.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review-order',
  templateUrl: './review-order.component.html',
  styleUrls: ['./review-order.component.scss']
})
export class ReviewOrderComponent implements OnInit {

  orderData;
  userData;
  customerId;
  token;

  constructor(
    private router: Router,
    private dataShareService: DataShareService,
    private service: CrudService,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.dataShareService.orderFormData.subscribe(res => {
      if (res) {
        this.orderData = res;
      } else {
        // this.orderData = JSON.parse(localStorage.getItem('orderData'));
      }
    });
  }

  ngOnInit(): void {
  }

  // back to add order form
  backToAddOrder() {
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'addOrder' });
    this.dataShareService.setOrderData(this.orderData);
  }

  onSubmit() {
    console.log('this.orderData => ', this.orderData);
    if (this.orderData) {
      const delivery_date = moment(this.orderData.deliveryDate).format('L');
      console.log('delivery_date => ', delivery_date);
      const body = `StrCustomerid=${this.userData.CustomerID._text}&` +
        `DatDueDate=${delivery_date}&` +
        `IntSiteID=${this.orderData.site.value}&` +
        `intTankID=${this.orderData.tank.value}&` +
        `strItem=${this.orderData.item.value}&` +
        `dblordqty=${this.orderData.qty}&` +
        `strToken=${this.userData.TokenID._text}`;
      console.log('body => ', body);
      this.service.post('CreateOrder', body).subscribe(res => {
        console.log('res :: createOrder => ', res);
        const data = this.commonService.XMLtoJson(res);
        console.log('data => ', data);
        if (data && data.createOrderResponse.errorCode._text === '0') {
          console.log('Order added => ', data.createOrderResponse.OrderID);
          this.toastr.success('Order placed successfully!');
        } else {
          this.toastr.error('Error occurred, Please try again later!');
        }
        this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
        this.dataShareService.manageCurrentLocationIcon({ currentLocation: false });
        this.dataShareService.setOrderData({});
      }, (err) => {
        console.log('err => ', err);
      });
    }
  }

}

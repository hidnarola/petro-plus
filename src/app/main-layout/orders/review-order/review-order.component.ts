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
  tankData: any;
  tankPrice;
  totalPrice;
  userData;
  customerId;
  token;
  taxValue;
  totalValue;

  constructor(
    private router: Router,
    private dataShareService: DataShareService,
    private service: CrudService,
    private commonService: CommonService,
    private toastr: ToastrService
  ) {
    // let height = window.innerHeight;
    // console.log('height=>', height);

    // document.getElementById('stepHeight').style.height = height + 'px';
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.dataShareService.orderFormData.subscribe(res => {

      if (res) {
        this.orderData = res;

        if (this.orderData.tank) {
          const body = `IntTankID=${this.orderData.tank}&` + `strToken=${this.userData.TokenID._text}`;
          this.service.post('ViewTankInfo', body).subscribe(res => {

            const data = this.commonService.XMLtoJson(res);
            if (data.viewTankInfoResponse.SessionStatus._text === 'Active') {
              this.tankData = data.viewTankInfoResponse;
              // .TankItemPrice._text
              if (this.tankData.TankItemPrice && this.tankData.TankItemPrice._text) {

                this.tankPrice = this.tankData.TankItemPrice._text;
                this.totalPrice = parseFloat(this.tankData.TankItemPrice._text) * (this.orderData.qty);

              }

              if (this.tankData.TaxRate && this.tankData.TaxRate._text) {
                this.taxValue = this.totalPrice * this.tankData.TaxRate._text;
                this.totalValue = this.taxValue + this.totalPrice;

              }
            } else {
              this.router.navigate(['']);
              localStorage.removeItem('userData');
              this.dataShareService.setBottomSheet({});
            }
          }, err => {

          });
        }

      } else {
        // this.orderData = JSON.parse(localStorage.getItem('orderData'));
      }
    });
  }

  ngOnInit(): void {
  }

  // back to add order form
  backToAddOrder() {
    console.log('this.orderData=>', this.orderData);

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
        `IntSiteID=${this.tankData.SiteID._text}&` +
        `intTankID=${this.tankData.SiteID._text}&` +
        `strItem=${this.tankData.TankCurrentItem._text}&` +
        `dblordqty=${this.orderData.qty}&` +
        `strToken=${this.userData.TokenID._text}`;
      this.service.post('CreateOrder', body).subscribe(res => {
        console.log('res :: createOrder => ', res);
        const data = this.commonService.XMLtoJson(res);
        console.log('data => ', data);
        if (data.createOrderResponse.SessionStatus._text === 'Active') {
          if (data && data.createOrderResponse.errorCode._text === '0') {
            console.log('Order added => ', data.createOrderResponse.OrderID);
            this.toastr.success('Order placed successfully!');
            this.dataShareService.setCloseTabData({ Component: 'addOrder' });
          } else if (data && data.createOrderResponse.errorCode._text === '-2') {
            this.toastr.error('TokenID not Found, Please Login again!');
          } else {
            this.toastr.error('Error occurred, Please try again later!');
          }
          this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
          this.dataShareService.manageCurrentLocationIcon({ currentLocationIcon: false });
          this.dataShareService.setOrderData({});
          this.dataShareService.setTankOrderData({});
        } else {
          this.router.navigate(['']);
          localStorage.removeItem('userData');
          this.dataShareService.setBottomSheet({});
        }
      }, (err) => {
        console.log('err => ', err);
      });
    }
  }

}

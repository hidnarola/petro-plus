import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  userData;
  allOrderData: any = [];
  completeOrder: any = [];
  message = 'No Data';
  messageCompelet = 'No Data';
  isnoCompeletedata = false;
  isnodata = false;
  constructor(
    private service: CrudService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService) {

    this.userData = JSON.parse(localStorage.getItem('userData'));

    const body = `StrCustomer=${this.userData.CustomerID._text}&` +
      `Status=${2}&` +
      `strToken=${this.userData.TokenID._text}&`;
    this.service.post('CheckOrderStatus', body).subscribe(res => {
      const data = this.commonService.XMLtoJson(res);
      console.log('data=>', data);

      if (data.CheckOrderStatusResponse && data.CheckOrderStatusResponse.Found._text && data.CheckOrderStatusResponse.Orders && data.CheckOrderStatusResponse.Orders.Order && data.CheckOrderStatusResponse.Orders.Order.length) {


        data.CheckOrderStatusResponse.Orders.Order.forEach(e => {
          e.OrderDate._text = moment(e.OrderDate._text, 'YYYY-MM-DD').format('DD MMM YYYY');
          this.allOrderData.push(e);
        });

      } else if (data.CheckOrderStatusResponse && data.CheckOrderStatusResponse.Found._text == '1') {


        data.CheckOrderStatusResponse.Orders.Order.OrderDate._text = moment(data.CheckOrderStatusResponse.Orders.Order.OrderDate._text, 'YYYY-MM-DD').format('DD MMM YYYY');
        this.allOrderData.push(data.CheckOrderStatusResponse.Orders.Order);

      } else if (data.CheckOrderStatusResponse && data.CheckOrderStatusResponse.Found._text === '0') {

        this.message = 'There is no Orderes.';
        this.isnodata = true;


      }
      // this.spinner.hide();
    });

    const body1 = `StrCustomer=${this.userData.CustomerID._text}&` +
      `Status=${1}&` +
      `strToken=${this.userData.TokenID._text}&`;
    this.service.post('CheckOrderStatus', body1).subscribe(res => {
      const data1 = this.commonService.XMLtoJson(res);
      console.log('data1=>', data1);

      if (data1.CheckOrderStatusResponse && data1.CheckOrderStatusResponse.Found._text && data1.CheckOrderStatusResponse.Orders && data1.CheckOrderStatusResponse.Orders.Order && data1.CheckOrderStatusResponse.Orders.Order.length) {

        data1.CheckOrderStatusResponse.Orders.Order.forEach(e => {
          e.OrderDueDate._text = moment(e.OrderDueDate._text, 'YYYY-MM-DD').format('DD MMM YYYY');
          this.completeOrder.push(e);
        });
      } else if (data1.CheckOrderStatusResponse && data1.CheckOrderStatusResponse.Found._text == '1') {
        data1.CheckOrderStatusResponse.Orders.Order.OrderDueDate._text = moment(data1.CheckOrderStatusResponse.Orders.Order.OrderDueDate._text, 'YYYY-MM-DD').format('DD MMM YYYY');
        this.completeOrder.push(data1.CheckOrderStatusResponse.Orders.Order);

      } else if (data1.CheckOrderStatusResponse && data1.CheckOrderStatusResponse.Found._text === '0') {
        this.isnoCompeletedata = true;
        this.messageCompelet = 'There is no Completed Orderes.';
      }

    });
    this.spinner.hide();
  }

  ngOnInit(): void {
  }

}

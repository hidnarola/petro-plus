import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  data: OrderDetail;

  private orderData = new BehaviorSubject(this.data);
  orderFormData = this.orderData.asObservable();

  public setOrderData(obj) {
    console.log('obj => ', obj);
    this.orderData.next(
      {
        site: obj.site,
        tank: obj.tank,
        item: obj.item,
        qty: obj.qty,
        deliveryDate: obj.deliveryDate
      }
    );
  }

}

interface OrderDetail {
  site: string;
  tank: string;
  item: string;
  qty: string;
  deliveryDate: Date;
}

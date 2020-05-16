import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  data: OrderDetail;
  dataBottomSheet: BottomSheetDetail;

  private orderData = new BehaviorSubject(this.data);
  orderFormData = this.orderData.asObservable();

  private bottomData = new BehaviorSubject(this.dataBottomSheet);
  bottomSheetData = this.bottomData.asObservable();

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

  public setBottomSheet(obj) {
    console.log('obj => ', obj);
    this.bottomData.next(
      {
        step: obj.step,
        targetComponent: obj.targetComponent
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
interface BottomSheetDetail {
  step: string;
  targetComponent: string;
}

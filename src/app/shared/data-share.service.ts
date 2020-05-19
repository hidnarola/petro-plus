import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  data: OrderDetail;
  dataBottomSheet: BottomSheetDetail;
  dataHeader: HeaderDetail;
  dataCurrentLocation: CurrentLocationDetail;
  dataLocationIcon: LocationIconDetail;

  private orderData = new BehaviorSubject(this.data);
  orderFormData = this.orderData.asObservable();

  private bottomData = new BehaviorSubject(this.dataBottomSheet);
  bottomSheetData = this.bottomData.asObservable();

  private headerData = new BehaviorSubject(this.dataHeader);
  manageHeaderDetail = this.headerData.asObservable();

  private isCurrentLocation = new BehaviorSubject(this.dataCurrentLocation);
  manageIsCurrentLocation = this.isCurrentLocation.asObservable();

  private LocationIconData = new BehaviorSubject(this.dataLocationIcon);
  manageLocationIcon = this.LocationIconData.asObservable();

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
    this.bottomData.next(
      {
        step: obj.step,
        targetComponent: obj.targetComponent
      }
    );
  }

  public manageHeader(obj) {
    this.headerData.next(
      {
        mapView: obj.mapView
      }
    );
  }

  public manageCurrentLocation(obj) {
    this.isCurrentLocation.next(
      {
        isCurrentLocation: obj.isCurrentLocation
      }
    );
  }

  public manageCurrentLocationIcon(obj) {
    console.log('obj => ', obj);
    this.LocationIconData.next(
      {
        currentLocationIcon: obj.currentLocationIcon
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
interface HeaderDetail {
  mapView: boolean;
}
interface CurrentLocationDetail {
  isCurrentLocation: boolean;
}
interface LocationIconDetail {
  currentLocationIcon: boolean;
}

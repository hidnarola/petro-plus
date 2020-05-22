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

  dataBottomSheet: BottomSheetDetail;
  private bottomData = new BehaviorSubject(this.dataBottomSheet);
  bottomSheetData = this.bottomData.asObservable();

  dataHeader: HeaderDetail;
  private headerData = new BehaviorSubject(this.dataHeader);
  manageHeaderDetail = this.headerData.asObservable();

  dataCurrentLocation: CurrentLocationDetail;
  private isCurrentLocation = new BehaviorSubject(this.dataCurrentLocation);
  manageIsCurrentLocation = this.isCurrentLocation.asObservable();

  dataLocationIcon: LocationIconDetail;
  private LocationIconData = new BehaviorSubject(this.dataLocationIcon);
  manageLocationIcon = this.LocationIconData.asObservable();

  dataMarkedSite: MarkedSiteDetail;
  private markedSiteData = new BehaviorSubject(this.dataMarkedSite);
  manageMarkedSite = this.markedSiteData.asObservable();

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

  public setMarkedSiteDetail(obj) {
    console.log('obj => ', obj);
    this.markedSiteData.next({
      isMarked: obj.isMarked,
      // siteId: obj.siteId
    });
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
interface MarkedSiteDetail {
  isMarked: boolean;
  siteId?: string;
}

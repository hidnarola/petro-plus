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

  tankOrder: TankOrderDetail;
  private tankOrderData = new BehaviorSubject(this.tankOrder);
  tankOrderFormData = this.tankOrderData.asObservable();

  orderTab: OrderTabDetail;
  private orderTabData = new BehaviorSubject(this.orderTab);
  orderTabFormData = this.orderTabData.asObservable();

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

  dataTankDetail: TankDetail;
  private tankDetailData = new BehaviorSubject(this.dataTankDetail);
  tankDetail = this.tankDetailData.asObservable();

  public setOrderData(obj) {
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

  public setTankOrderData(obj) {
    this.tankOrderData.next(
      {
        site: obj.site,
        tank: obj.tank,
        item: obj.item,
        qty: obj.qty,
        type: obj.type
      }
    );
  }

  public setOrderTabData(obj) {
    this.orderTabData.next(
      {
        component: obj.component,

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
    this.LocationIconData.next(
      {
        currentLocationIcon: obj.currentLocationIcon
      }
    );
  }

  public setMarkedSiteDetail(obj) {
    this.markedSiteData.next({
      isMarked: obj.isMarked,
      siteId: obj.siteId ? obj.siteId : ''
    });
  }

  public setTankDetail(obj) {
    console.log('obj :: tank detail :: data share service => ', obj);
    this.tankDetailData.next({
      siteId: obj.siteId,
      tankId: obj.tankId
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

interface TankOrderDetail {
  site: number;
  tank: number;
  item: string;
  qty: number;
  type: string;
}

interface OrderTabDetail {
  component: number;
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
interface TankDetail {
  siteId: string;
  tankId: string;
}

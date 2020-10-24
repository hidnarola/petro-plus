import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from 'src/app/shared/data-share.service';

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
  step = 2;
  currentLocationIcon = true;
  isCurrentLocation = false;
  constructor(
    private service: CrudService,
    private spinner: NgxSpinnerService,
    private commonService: CommonService,
    private router: Router,
    private dataShareService: DataShareService,
    private activatedRoute: ActivatedRoute) {

    this.userData = JSON.parse(localStorage.getItem('userData'));

    // Data share service to manage bottom sheet component Level and content
    this.dataShareService.bottomSheetData.subscribe(res => {
      if (res) {

        if (res.targetComponent === 'initial') {
          setTimeout(() => {
            this.step = parseInt(res.step, 16);
            this.bottomSheetLevel(res.step);
          }, 1000);
        } else {
          this.dataShareService.setLastTabData({ lastStep: res.step, lastComponent: res.targetComponent });
        }


      }
    });



    // Data share service to manage Curren location Icon
    this.dataShareService.manageLocationIcon.subscribe(res => {
      if (res) {
        if (res.currentLocationIcon) {
          this.currentLocationIcon = true;
        } else {
          this.currentLocationIcon = false;
        }
      }
    });

    const body = `StrCustomer=${this.userData.CustomerID._text}&` +
      `Status=${2}&` +
      `strToken=${this.userData.TokenID._text}&`;
    this.service.post('CheckOrderStatus', body).subscribe(res => {
      const data = this.commonService.XMLtoJson(res);
      console.log('dataorder=>', data);
      if (data.CheckOrderStatusResponse.SessionStatus._text === 'Active') {
        if (data.CheckOrderStatusResponse && data.CheckOrderStatusResponse.Found._text && data.CheckOrderStatusResponse.Orders && data.CheckOrderStatusResponse.Orders.Order && data.CheckOrderStatusResponse.Orders.Order.length) {


          data.CheckOrderStatusResponse.Orders.Order.forEach(e => {
            if (e.OrderStatus._text !== 'Complete') {
              e.OrderDate._text = moment(e.OrderDate._text, 'YYYY-MM-DD').format('DD MMM YYYY');
              this.allOrderData.push(e);
            }

          });

        } else if (data.CheckOrderStatusResponse && data.CheckOrderStatusResponse.Found._text == '1') {

          if (data.CheckOrderStatusResponse.Orders.Order.OrderStatus._text !== 'Complete') {
            data.CheckOrderStatusResponse.Orders.Order.OrderDate._text = moment(data.CheckOrderStatusResponse.Orders.Order.OrderDate._text, 'YYYY-MM-DD').format('DD MMM YYYY');
            this.allOrderData.push(data.CheckOrderStatusResponse.Orders.Order);
          }
        } else if (data.CheckOrderStatusResponse && data.CheckOrderStatusResponse.Found._text === '0') {

          this.message = 'There is no Orderes.';
          this.isnodata = true;


        }
      } else {
        this.router.navigate(['']);
        localStorage.removeItem('userData');
        this.dataShareService.setBottomSheet({});

      }

      // this.spinner.hide();
    });

    const body1 = `StrCustomer=${this.userData.CustomerID._text}&` +
      `Status=${1}&` +
      `strToken=${this.userData.TokenID._text}&`;
    this.service.post('CheckOrderStatus', body1).subscribe(res => {
      const data1 = this.commonService.XMLtoJson(res);
      if (data1.CheckOrderStatusResponse.SessionStatus._text === 'Active') {
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
      } else {
        this.router.navigate(['']);
        localStorage.removeItem('userData');
        this.dataShareService.setBottomSheet({});
      }
    });
    this.spinner.hide();
  }

  ngOnInit(): void {
  }
  // swipe up handler
  swipeUpHandler(step) {

    if (step > 0 && step < 3) {
      this.step = step + 1;
      this.bottomSheetLevel(this.step);
      this.dataShareService.setOrderHistory({ level: this.step });

      if (this.activatedRoute.snapshot['_routerState'].url === '/sites') {
        document.getElementsByClassName('SitesList BodyContent')[0].classList.remove('active');
      }

    }
  }

  // swipe down handler
  swipeDownHandler(step) {

    if (step > 1 && step < 4) {
      this.step = step - 1;
      this.bottomSheetLevel(this.step);
      if (this.activatedRoute.snapshot['_routerState'].url === '/sites') {
        this.dataShareService.setOrderHistory({ level: this.step });
        if (this.step == 2) {
          document.getElementsByClassName('SitesList BodyContent')[0].classList.remove('active');

        } else {
          const sheetHTML = document.getElementsByClassName('SitesList BodyContent');
          sheetHTML[0].classList.add('active');

        }
      }
    }
  }

  // open Add order form
  openAddOrder() {
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'addOrder' });
  }


  // Handle Bottom sheet height as per steps
  bottomSheetLevel(step) {
    console.log('step from order=>', step);

    // Get Bottomsheet HTML using bottomsheet div class - use this class to manage height of Bottomsheet
    const sheetHTML = document.getElementsByClassName('OuterBox');

    let classArray = [];
    if (step === 1) {
      // Bottom sheet level 1
      sheetHTML[0].classList.add('StepOne');
      document.getElementById('stepHeight').style.height = '75px';
      if (this.activatedRoute.snapshot['_routerState'].url === '/sites/map') {

        this.currentLocationIcon = true;
      }
      // if HeaderBody or HeaderNone class is there - remove it, To display Header icons again on Map
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
      }
      // Remove classes for bottom sheet Level 0,2,3,4
      classArray = ['bottomSheet0', 'StepTwo', 'StepThree', 'bottomSheetFull'];
    } else if (step === 2) {

      // Bottom sheet level 2
      sheetHTML[0].classList.add('StepTwo');
      document.getElementById('stepHeight').style.height = '330px';
      if (this.activatedRoute.snapshot['_routerState'].url === '/sites/map') {

        this.currentLocationIcon = true;
      }
      // if HeaderBody or HeaderNone class is there - remove it, To display Header icons again on Map
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
      }
      // Remove classes for bottom sheet Level 0, 1, 3, 4
      classArray = ['bottomSheet0', 'StepOne', 'StepThree', 'bottomSheetFull'];
    } else if (step === 3) {
      console.log('here in 3rd=======>');
      // Bottom sheet level 3 manage heigth
      let height = window.innerHeight - 40;

      sheetHTML[0].classList.add('StepThree');

      if (this.activatedRoute.snapshot['_routerState'].url === '/sites/map') {

        this.currentLocationIcon = false;
      }
      document.getElementById('stepHeight').style.height = height + 'px';
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderNone');
      // Remove classes for bottom sheet Level 0, 1, 2, 4
      classArray = ['bottomSheet0', 'StepOne', 'StepTwo', 'bottomSheetFull'];
    } else if (step === 4) {
      // Full Bottom sheet
      sheetHTML[0].classList.add('bottomSheetFull');
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderBody');
      // Remove classes for bottom sheet Level 0, 1, 2, 3
      classArray = ['bottomSheet0', 'StepOne', 'StepTwo', 'StepThree'];
    } else if (step === 0) {
      // Auto Height Bottom sheet
      sheetHTML[0].classList.add('bottomSheet0');
      // Remove HeaderBody class if it is there
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderNone');
      // Remove classes for bottom sheet Level 1, 2, 3, 4
      classArray = ['StepOne', 'StepTwo', 'StepThree', 'bottomSheetFull'];
    }
    if (classArray && classArray.length > 0) {
      classArray.map(value => {
        if (sheetHTML[0].classList.contains(value)) {
          sheetHTML[0].classList.remove(value);
        }
      });
    }



  }

  // Manage current location on map
  manageCurrentLocation() {
    if (this.isCurrentLocation) {
      this.isCurrentLocation = false;
    } else {
      this.isCurrentLocation = true;
    }
    setTimeout(() => {
      this.dataShareService.manageCurrentLocation({ isCurrentLocation: this.isCurrentLocation });
    }, 1000);
  }

}

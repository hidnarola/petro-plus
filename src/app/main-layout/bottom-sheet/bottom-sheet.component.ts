
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  isCurrentLocation = false;
  step = 1;
  displayData;
  currentLocationIcon = true;
  slidingIcon = true;
  placeOrderButton = true;
  orderHistory = true;
  addOrder = false;
  reviewOrder = false;
  // checkout = false;
  mapOptions = false;
  markedSite = false;
  isMaintain = false;
  tankDetail = false;
  component: any;
  constructor(
    private dataShareService: DataShareService,
    private route: ActivatedRoute
  ) {
    if (this.route.snapshot['_routerState'].url === '/sites/map') {
      // Data share service to manage bottom sheet component Level and content
      this.dataShareService.bottomSheetData.subscribe(res => {
        console.log('res target=>', res);
        if (res !== undefined) {

          this.step = parseInt(res.step, 16);
          // this.bottomSheetLevel(res.step);
          if (res.targetComponent) {
            this.component = res.targetComponent;
            this.bottomSheetContent(res.targetComponent);
          }
        }
        else {
          this.dataShareService.lastTabFormData.subscribe(tab => {
            console.log('res target=>', tab);
            if (tab) {

              if (tab.lastComponent) {
                this.bottomSheetContent(tab.lastComponent);
              }
            }
          });
        }
      });
    } else {
      this.dataShareService.lastTabFormData.subscribe(tab => {
        console.log('res target=>', tab);
        if (tab) {

          if (tab.lastComponent) {
            this.bottomSheetContent(tab.lastComponent);
          }
        }
      });
    }






    this.dataShareService.closeTabFormData.subscribe(tab => {

      if (tab) {
        this.closeBottomSheet(tab.Component);
      }
    })
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
    // Data share service to manage marked site
    this.dataShareService.manageMarkedSite.subscribe(res => {
      if (res) {
        if (res.isMarked) {
          this.markedSite = true;
          this.isMaintain = true;
          this.step = 2;
          // this.bottomSheetLevel(2);
          this.bottomSheetContent('markedSite');
        }
      }
    });

    setTimeout(() => {
      if (this.route.snapshot['_routerState'].url === '/sites/map') {
        // this.bottomSheetLevel(2);
        this.step = 2;
      }
    }, 0);




  }

  ngOnInit(): void {
    // Default Bottom sheet will be at Level 1
    // document.getElementsByClassName('BtmFixedBox')[0].classList.add('bottomSheet1');
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

  // // open Add order form
  // openAddOrder() {
  //   this.bottomSheetLevel(4);
  //   this.bottomSheetContent('addOrder');
  // }

  // // swipe up handler
  // swipeUpHandler(step) {

  //   if (step > 0 && step < 3) {
  //     this.step = step + 1;
  //     this.bottomSheetLevel(this.step);
  //     this.dataShareService.setLastTabData({ lastStep: this.step, lastComponent: this.component });
  //   }
  // }

  // // swipe down handler
  // swipeDownHandler(step) {

  //   if (step > 1 && step < 4) {
  //     this.step = step - 1;
  //     this.bottomSheetLevel(this.step);
  //     this.dataShareService.setLastTabData({ lastStep: this.step, lastComponent: this.component });
  //   }
  // }

  // // Handle Bottom sheet height as per steps
  // bottomSheetLevel(step) {
  //   // console.log('step=>', step);

  //   // Get Bottomsheet HTML using bottomsheet div class - use this class to manage height of Bottomsheet
  //   const sheetHTML = document.getElementsByClassName('BtmFixedBox');
  //   // console.log('sheetHTML=>', sheetHTML);

  //   let classArray = [];
  //   // if (step === 1) {
  //   //   // Bottom sheet level 1
  //   //   sheetHTML[0].classList.add('bottomSheet1');
  //   //   // if HeaderBody or HeaderNone class is there - remove it, To display Header icons again on Map
  //   //   if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
  //   //     document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
  //   //   }
  //   //   if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
  //   //     document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
  //   //   }
  //   //   // Remove classes for bottom sheet Level 0,2,3,4
  //   //   classArray = ['bottomSheet0', 'bottomSheet2', 'bottomSheet3', 'bottomSheetFull'];
  //   // } else if (step === 2) {
  //   //   // Bottom sheet level 2
  //   //   sheetHTML[0].classList.add('bottomSheet2');
  //   //   // if HeaderBody or HeaderNone class is there - remove it, To display Header icons again on Map
  //   //   if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
  //   //     document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
  //   //   }
  //   //   if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
  //   //     document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
  //   //   }
  //   //   // Remove classes for bottom sheet Level 0, 1, 3, 4
  //   //   classArray = ['bottomSheet0', 'bottomSheet1', 'bottomSheet3', 'bottomSheetFull'];
  //   // } else if (step === 3) {
  //   //   // Bottom sheet level 3
  //   //   sheetHTML[0].classList.add('bottomSheet3');
  //   //   // Hide navbar icons on Map
  //   //   document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderNone');
  //   //   // Remove classes for bottom sheet Level 0, 1, 2, 4
  //   //   classArray = ['bottomSheet0', 'bottomSheet1', 'bottomSheet2', 'bottomSheetFull'];
  //   // } else if (step === 4) {
  //   //   // Full Bottom sheet
  //   //   sheetHTML[0].classList.add('bottomSheetFull');
  //   //   // Hide navbar icons on Map
  //   //   document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderBody');
  //   //   // Remove classes for bottom sheet Level 0, 1, 2, 3
  //   //   classArray = ['bottomSheet0', 'bottomSheet1', 'bottomSheet2', 'bottomSheet3'];
  //   // } else if (step === 0) {
  //   //   // Auto Height Bottom sheet
  //   //   sheetHTML[0].classList.add('bottomSheet0');
  //   //   // Remove HeaderBody class if it is there
  //   //   if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
  //   //     document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
  //   //   }
  //   //   // Hide navbar icons on Map
  //   //   document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderNone');
  //   //   // Remove classes for bottom sheet Level 1, 2, 3, 4
  //   //   classArray = ['bottomSheet1', 'bottomSheet2', 'bottomSheet3', 'bottomSheetFull'];
  //   // }
  //   if (classArray && classArray.length > 0) {
  //     classArray.map(value => {
  //       if (sheetHTML[0].classList.contains(value)) {
  //         sheetHTML[0].classList.remove(value);
  //       }
  //     });
  //   }
  // }

  closeBottomSheet(tabName) {
    if (tabName === 'initial') {
      this.orderHistory = false;
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');

    } else if (tabName === 'addOrder') {
      document.getElementsByClassName('BoxHeight AddOrderPage')[0].classList.remove('active');
      this.addOrder = false;
      document.getElementsByClassName('BoxHeight ReviewOrderPage')[0].classList.remove('active');
      this.reviewOrder = false;

    } else if (tabName === 'reviewOrder') {
      document.getElementsByClassName('BoxHeight ReviewOrderPage')[0].classList.remove('active');
      this.reviewOrder = false;

    } else if (tabName === 'mapOptions') {
      document.getElementsByClassName('BoxHeight MapOptionsPage')[0].classList.remove('active');
      this.slidingIcon = true;
      this.mapOptions = false;

    } else if (tabName === 'markedSite') {
      this.markedSite = false;
      this.dataShareService.manageHeader({ mapView: true });
      this.markedSite = false;
      document.getElementsByClassName('BoxHeight MarkedSitePage')[0].classList.remove('active');

    } else if (tabName === 'tankDetail') {
      this.tankDetail = false;
      this.isMaintain = false;
      document.getElementsByClassName('BoxHeight TankDetailPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
    }
  }

  bottomSheetContent(component) {
    console.log('component=>', component);
    if (component == 'tankDetail') {
      this.isMaintain = true;
    }
    console.log('this.markedSite ,this.isTank=>', this.markedSite);

    if (component === 'initial') {
      if (!this.isMaintain) {
        const sheetHTML = document.getElementsByClassName('BoxHeight OrderHistoryPage');
        sheetHTML[0].classList.add('active');
        document.getElementsByClassName('BoxHeight MarkedSitePage')[0].classList.remove('active');
        document.getElementsByClassName('BoxHeight TankDetailPage')[0].classList.remove('active');
        document.getElementsByClassName('BoxHeight ReviewOrderPage')[0].classList.remove('active');
        document.getElementsByClassName('BoxHeight AddOrderPage')[0].classList.remove('active');
        document.getElementsByClassName('BoxHeight MapOptionsPage')[0].classList.remove('active');
        this.slidingIcon = true;
        // this.placeOrderButton = true;
        // this.addOrder = false;
        this.orderHistory = true;
        // this.reviewOrder = false;
        // this.checkout = false;
        // this.mapOptions = false;
        // this.markedSite = false;
        // this.tankDetail = false;
      }



    } else if (component === 'addOrder') {
      const sheetHTML = document.getElementsByClassName('BoxHeight AddOrderPage');
      sheetHTML[0].classList.add('active');
      document.getElementsByClassName('BoxHeight MarkedSitePage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight TankDetailPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight ReviewOrderPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight MapOptionsPage')[0].classList.remove('active');
      this.slidingIcon = false;
      // this.placeOrderButton = false;
      this.addOrder = true;
      // this.orderHistory = false;
      // this.reviewOrder = false;
      // this.checkout = false;
      // this.mapOptions = false;
      // this.markedSite = false;
      // this.tankDetail = false;
    } else if (component === 'reviewOrder') {
      const sheetHTML = document.getElementsByClassName('BoxHeight ReviewOrderPage');
      sheetHTML[0].classList.add('active');
      document.getElementsByClassName('BoxHeight MarkedSitePage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight TankDetailPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight AddOrderPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight MapOptionsPage')[0].classList.remove('active');
      this.slidingIcon = false;
      // this.placeOrderButton = false;
      this.reviewOrder = true;
      // this.addOrder = false;
      // this.orderHistory = false;
      // this.checkout = false;
      // this.mapOptions = false;
      // this.markedSite = false;
      // this.tankDetail = false;
    } else if (component === 'mapOptions') {
      const sheetHTML = document.getElementsByClassName('BoxHeight MapOptionsPage');
      sheetHTML[0].classList.add('active');
      document.getElementsByClassName('BoxHeight MarkedSitePage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight TankDetailPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight AddOrderPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      this.slidingIcon = false;
      // this.placeOrderButton = false;
      // this.checkout = false;
      // this.reviewOrder = false;
      // this.addOrder = false;
      // this.orderHistory = false;
      this.mapOptions = true;
      // this.markedSite = false;
      // this.tankDetail = false;
    } else if (component === 'markedSite') {
      const sheetHTML = document.getElementsByClassName('BoxHeight MarkedSitePage');
      sheetHTML[0].classList.add('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight TankDetailPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight AddOrderPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight MapOptionsPage')[0].classList.remove('active');
      this.markedSite = true;
      this.slidingIcon = true;
      // this.placeOrderButton = false;
      // this.checkout = false;
      // this.reviewOrder = false;
      // this.addOrder = false;
      // this.orderHistory = true;
      // this.mapOptions = false;
      // this.tankDetail = false;
    } else if (component === 'tankDetail') {
      this.tankDetail = true;
      const sheetHTML = document.getElementsByClassName('BoxHeight TankDetailPage');
      sheetHTML[0].classList.add('active');
      document.getElementsByClassName('BoxHeight MarkedSitePage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight OrderHistoryPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight AddOrderPage')[0].classList.remove('active');
      document.getElementsByClassName('BoxHeight MapOptionsPage')[0].classList.remove('active');
      // this.markedSite = false;
      this.slidingIcon = true;
      // this.placeOrderButton = false;
      // this.checkout = false;
      // this.reviewOrder = false;
      // this.addOrder = false;
      // this.orderHistory = false;
      // this.mapOptions = false;
    }
    // else if (component === 'checkout') {
    //   this.slidingIcon = false;
    //   this.placeOrderButton = false;
    //   this.checkout = true;
    //   this.reviewOrder = false;
    //   this.addOrder = false;
    //   this.orderHistory = false;
    //   this.mapOptions = false;
    //   this.markedSite = false;
    //   this.tankDetail = false;
    // }

  }

}

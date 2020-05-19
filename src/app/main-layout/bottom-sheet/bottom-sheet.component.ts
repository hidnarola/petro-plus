import { Component, OnInit } from '@angular/core';
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
  checkout = false;
  mapOptions = false;

  constructor(
    private dataShareService: DataShareService
  ) {
    // Data share service to manage bottom sheet component Level and content
    this.dataShareService.bottomSheetData.subscribe(res => {
      console.log('res :: datashare service => ', res);
      if (res) {
        this.step = parseInt(res.step, 16);
        this.bottomSheetLevel(res.step);
        if (res.targetComponent) {
          this.bottomSheetContent(res.targetComponent);
        }
      } else {
        console.log('No response from data share service => ');
      }
    });
    // Data share service to manage Curren location Icon
    this.dataShareService.manageLocationIcon.subscribe(res => {
      console.log('res :: map icon => ', res);
      if (res) {
        if (res.currentLocationIcon) {
          this.currentLocationIcon = true;
        } else {
          this.currentLocationIcon = false;
        }
      }
    });
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
    console.log('this.isCurrentLocation => ', this.isCurrentLocation);
    setTimeout(() => {
      this.dataShareService.manageCurrentLocation({ isCurrentLocation: this.isCurrentLocation });
    }, 1000);
  }

  // open Add order form
  openAddOrder() {
    this.bottomSheetLevel(4);
    this.bottomSheetContent('addOrder');
  }

  // swipe up handler
  swipeUpHandler(step) {
    console.log('step :: swipe up => ', step);
    if (step > 0 && step < 3) {
      this.step = step + 1;
      this.bottomSheetLevel(this.step);
      console.log('Swipe up => ');
    }
  }

  // swipe down handler
  swipeDownHandler(step) {
    console.log('step :: swipe down=> ', step);
    if (step > 1 && step < 4) {
      this.step = step - 1;
      this.bottomSheetLevel(this.step);
      console.log('swipe down => ');
    }
  }

  // Handle Bottom sheet height as per steps
  bottomSheetLevel(step) {
    // Get Bottomsheet HTML using bottomsheet div class - use this class to manage height of Bottomsheet
    const sheetHTML = document.getElementsByClassName('BtmFixedBox');
    console.log('step :: bottom sheet function => ', step);
    let classArray = [];
    if (step === 1) {
      // Bottom sheet level 1
      sheetHTML[0].classList.add('bottomSheet1');
      // if HeaderBody or HeaderNone class is there - remove it, To display Header icons again on Map
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
      }
      // Remove classes for bottom sheet Level 0,2,3,4
      classArray = ['bottomSheet0', 'bottomSheet2', 'bottomSheet3', 'bottomSheetFull'];
    } else if (step === 2) {
      // Bottom sheet level 2
      sheetHTML[0].classList.add('bottomSheet2');
      // if HeaderBody or HeaderNone class is there - remove it, To display Header icons again on Map
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
      }
      // Remove classes for bottom sheet Level 0, 1, 3, 4
      classArray = ['bottomSheet0', 'bottomSheet1', 'bottomSheet3', 'bottomSheetFull'];
    } else if (step === 3) {
      // Bottom sheet level 3
      sheetHTML[0].classList.add('bottomSheet3');
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderNone');
      // Remove classes for bottom sheet Level 0, 1, 2, 4
      classArray = ['bottomSheet0', 'bottomSheet1', 'bottomSheet2', 'bottomSheetFull'];
    } else if (step === 4) {
      // Full Bottom sheet
      sheetHTML[0].classList.add('bottomSheetFull');
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderBody');
      // Remove classes for bottom sheet Level 0, 1, 2, 3
      classArray = ['bottomSheet0', 'bottomSheet1', 'bottomSheet2', 'bottomSheet3'];
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
      classArray = ['bottomSheet1', 'bottomSheet2', 'bottomSheet3', 'bottomSheetFull'];
    }
    console.log('classArray => ', classArray);
    if (classArray && classArray.length > 0) {
      classArray.map(value => {
        // console.log('value => ', value);
        if (sheetHTML[0].classList.contains(value)) {
          sheetHTML[0].classList.remove(value);
        }
      });
    }
  }

  bottomSheetContent(component) {
    console.log('component => ', component);
    if (component === 'initial') {
      this.slidingIcon = true;
      this.placeOrderButton = true;
      this.addOrder = false;
      this.orderHistory = true;
      this.reviewOrder = false;
      this.checkout = false;
      this.mapOptions = false;
    } else if (component === 'addOrder') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.addOrder = true;
      this.orderHistory = false;
      this.reviewOrder = false;
      this.checkout = false;
      this.mapOptions = false;
    } else if (component === 'reviewOrder') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.reviewOrder = true;
      this.addOrder = false;
      this.orderHistory = false;
      this.checkout = false;
      this.mapOptions = false;
    } else if (component === 'checkout') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.checkout = true;
      this.reviewOrder = false;
      this.addOrder = false;
      this.orderHistory = false;
      this.mapOptions = false;
    } else if (component === 'mapOptions') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.checkout = false;
      this.reviewOrder = false;
      this.addOrder = false;
      this.orderHistory = false;
      this.mapOptions = true;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  step = 1;
  displayData;
  slidingIcon = true;
  placeOrderButton = true;
  orderHistory = true;
  addOrder = false;
  reviewOrder = false;
  checkout = false;

  constructor(
    private dataShareService: DataShareService
  ) {
    this.dataShareService.bottomSheetData.subscribe(res => {
      console.log('res :: datashare service => ', res);
      if (res) {
        if (res.step) {
          this.bottomSheetLevel(res.step);
        }
        if (res.targetComponent) {
          this.bottomSheetContent(res.targetComponent);
        }
      } else {
        console.log('No response from data share service => ');
      }
    });
  }

  ngOnInit(): void {
    // Default Bottom sheet will be at Level 1
    document.getElementsByClassName('BtmFixedBox')[0].classList.add('bottomSheet1');
  }

  // open Add order form
  openAddOrder() {
    this.bottomSheetLevel(4);
    this.bottomSheetContent('addOrder');
  }

  // swipe up handler
  swipeUpHandler(step) {
    this.step = step + 1;
    this.bottomSheetLevel(this.step);
    console.log('Swipe up => ');
  }

  // swipe down handler
  swipeDownHandler(step) {
    this.step = step - 1;
    this.bottomSheetLevel(this.step);
    console.log('swipe down => ');
  }

  // Handle Bottom sheet height as per steps
  bottomSheetLevel(step) {
    // Get Bottomsheet HTML using bottomsheet div class - use this class to manage height of Bottomsheet
    const sheetHTML = document.getElementsByClassName('BtmFixedBox');
    // const sheetHTML = document.getElementsByClassName('whiteBox');
    // sheetHTML[0].classList.add('bottomSheet2')
    // console.log('sheetHTML => ', sheetHTML);
    // console.log(' sheetHTML[0].classList => ', sheetHTML[0].classList);
    // console.log('sheetHTML[`HTMLCollection `] => ', sheetHTML[`HTMLCollection`]);
    console.log('step :: bottom sheet function => ', step);

    if (step === 1) {
      // Bottom sheet level 1
      sheetHTML[0].classList.add('bottomSheet1');
      // if HeaderBody class is there - remove it, To display Header icons again on Map
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      // Remove classes for bottom sheet Level 2,3,4
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
      if (sheetHTML[0].classList.contains('bottomSheetFull')) {
        sheetHTML[0].classList.remove('bottomSheetFull');
      }
    } else if (step === 2) {
      // Bottom sheet level 2
      sheetHTML[0].classList.add('bottomSheet2');
      // if HeaderBody class is there - remove it, To display Header icons again on Map
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      // Remove classes for bottom sheet Level 1, 3, 4
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
      if (sheetHTML[0].classList.contains('bottomSheetFull')) {
        sheetHTML[0].classList.remove('bottomSheetFull');
      }
    } else if (step === 3) {
      // Bottom sheet level 3
      sheetHTML[0].classList.add('bottomSheet3');
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderBody');
      // console.log('document.getElementsByClassName(`HeaderBar`) => ', document.getElementsByClassName('HeaderBar'));
      // Remove classes for bottom sheet Level 1, 2, 4
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
      if (sheetHTML[0].classList.contains('bottomSheetFull')) {
        sheetHTML[0].classList.remove('bottomSheetFull');
      }
    } else if (step === 4) {
      console.log('step 4 => ');
      // console.log('sheetHTML[0].classList => ', sheetHTML[0].classList);
      // Bottom sheet level 4
      sheetHTML[0].classList.add('bottomSheetFull');
      // Hide navbar icons on Map
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderBody');
      // console.log('document.getElementsByClassName(`HeaderBar`) => ', document.getElementsByClassName('HeaderBar'));
      // Remove classes for bottom sheet Level 1, 2, 3
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
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
    } else if (component === 'addOrder') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.addOrder = true;
      this.orderHistory = false;
      this.reviewOrder = false;
      this.checkout = false;
    } else if (component === 'reviewOrder') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.reviewOrder = true;
      this.addOrder = false;
      this.orderHistory = false;
      this.checkout = false;
    } else if (component === 'checkout') {
      this.slidingIcon = false;
      this.placeOrderButton = false;
      this.checkout = true;
      this.reviewOrder = false;
      this.addOrder = false;
      this.orderHistory = false;
    }
  }

}

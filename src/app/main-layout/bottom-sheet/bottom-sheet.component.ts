import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {

  step = 1;

  constructor() { }

  ngOnInit(): void {
    // this.bottomSheetLevel(this.step);
    document.getElementsByClassName('BtmFixedBox')[0].classList.add('bottomSheet1');
  }

  swipeUpHandler(step) {
    this.step = step + 1;
    this.bottomSheetLevel(this.step);
    console.log('Swipe up => ');
  }

  swipeDownHandler(step) {
    this.step = step - 1;
    this.bottomSheetLevel(this.step);
    console.log('swipe down => ');
  }

  bottomSheetLevel(step) {
    const sheetHTML = document.getElementsByClassName('BtmFixedBox');
    // const sheetHTML = document.getElementsByClassName('whiteBox');
    // sheetHTML[0].classList.add('bottomSheet2')
    // console.log('sheetHTML => ', sheetHTML);
    // console.log(' sheetHTML[0].classList => ', sheetHTML[0].classList);
    // console.log('sheetHTML[`HTMLCollection `] => ', sheetHTML[`HTMLCollection`]);
    console.log('step :: bottom sheet function => ', step);

    if (step === 1) {
      console.log('step 1 => ');
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      sheetHTML[0].classList.add('bottomSheet1');
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
    } else if (step === 2) {
      if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderBody')) {
        document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderBody');
      }
      sheetHTML[0].classList.add('bottomSheet2');
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
    } else if (step === 3) {
      sheetHTML[0].classList.add('bottomSheet3');
      document.getElementsByClassName('HeaderBar')[0].classList.add('HeaderBody');
      console.log('document.getElementsByClassName(`HeaderBar`) => ', document.getElementsByClassName('HeaderBar'));
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
    }
  }

}

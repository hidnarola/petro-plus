import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-map-view',
  templateUrl: './site-map-view.component.html',
  styleUrls: ['./site-map-view.component.scss']
})
export class SiteMapViewComponent implements OnInit {

  options: any;

  overlays: any[];
  lat = 40.730610;
  lng = -73.935242;
  step = 1;

  constructor() {

    // console.log(' document.getElementById(`bottomDiv`) => ', document.getElementById('bottomDiv'));
  }

  ngOnInit() {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
    this.bottomSheetLevel(this.step);
  }

  // swipeHandler() {
  //   console.log('swipe handler => ');
  //   alert('Swipe handled!');
  // }

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
      sheetHTML[0].classList.add('bottomSheet1');
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
    } else if (step === 2) {
      sheetHTML[0].classList.add('bottomSheet2');
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
      if (sheetHTML[0].classList.contains('bottomSheet3')) {
        sheetHTML[0].classList.remove('bottomSheet3');
      }
    } else if (step === 3) {
      sheetHTML[0].classList.add('bottomSheet3');
      if (sheetHTML[0].classList.contains('bottomSheet2')) {
        sheetHTML[0].classList.remove('bottomSheet2');
      }
      if (sheetHTML[0].classList.contains('bottomSheet1')) {
        sheetHTML[0].classList.remove('bottomSheet1');
      }
    }
  }

}

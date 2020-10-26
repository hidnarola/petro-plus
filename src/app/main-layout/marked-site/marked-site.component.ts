import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';
import { CrudService } from 'src/app/shared/crud.service';
import { CommonService } from 'src/app/shared/common.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marked-site',
  templateUrl: './marked-site.component.html',
  styleUrls: ['./marked-site.component.scss']
})
export class MarkedSiteComponent implements OnInit {
  userData: any;
  siteData: any;
  step = 2;
  currentLocationIcon = true;
  isCurrentLocation = false;
  tankData = [
    {
      TankID: {
        _text: '1'
      },
      TankName: {
        _text: 'Diesel1'
      },
      TankCapacity: {
        _text: '250.00'
      },
      TankCurrentLevel: {
        _text: '223.23'
      },
      TankCurrentLevelPCT: {
        _text: '89.00%'
      },
      TankCurrentItem: {
        _text: 'PET-DIESEL'
      },
      TankCurrentDensity: {
        _text: '977.00'
      },
      TankTemperature: {
        _text: '36.30'
      },
      chartData: {
        chart: {
          caption: Math.round(223.23) + ' gal',
          lowerLimit: '0',
          upperLimit: '100',
          showValue: '1',
          numberSuffix: '%',
          theme: 'fusion',
          showToolTip: '0',
          showTickMarks: '0',
          showTickValues: '0',
          captionFontColor: '#2e3192',
          valueFontSize: '15px'
        },
        colorRange: {
          color: [
            {
              minValue: '0',
              maxValue: '100',
              code: '#c0cad2'
            },
            {
              minValue: '0',
              maxValue: '89.00',
              code: '#6c9f43'
            }
          ]
        },
        dials: {
          dial: [
            {
              value: '89.00%'
            }
          ]
        }
      }
    },
    {
      TankID: {
        _text: '2'
      },
      TankName: {
        _text: 'Gasoline1'
      },
      TankCapacity: {
        _text: '300.00'
      },
      TankCurrentLevel: {
        _text: '123.23'
      },
      TankCurrentLevelPCT: {
        _text: '41.00%'
      },
      TankCurrentItem: {
        _text: 'PET-Gasoline'
      },
      TankCurrentDensity: {
        _text: '0.00'
      },
      TankTemperature: {
        _text: '0.00'
      },
      chartData: {
        chart: {
          caption: Math.round(223.23) + ' gal',
          lowerLimit: '0',
          upperLimit: '100',
          showValue: '1',
          numberSuffix: '%',
          theme: 'fusion',
          showToolTip: '0',
          showTickMarks: '0',
          showTickValues: '0',
          captionFontColor: '#2e3192',
          valueFontSize: '15px'
        },
        colorRange: {
          color: [
            {
              minValue: '0',
              maxValue: '100',
              code: '#c0cad2'
            },
            {
              minValue: '0',
              maxValue: '41.00',
              code: '#ffa500'
            }
          ]
        },
        dials: {
          dial: [
            {
              value: '41.00%'
            }
          ]
        }
      }
    }
  ];
  constructor(
    private dataShareService: DataShareService,
    private service: CrudService,
    private commonService: CommonService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.dataShareService.manageMarkedSite.subscribe(res => {
      if (res.siteId) {
        const body = `IntSiteID=${res.siteId}&` + `strToken=${this.userData.TokenID._text}`;
        this.service.post('ViewSiteInfo', body).subscribe(resp => {
          const data = this.commonService.XMLtoJson(resp);
          if (data.viewSiteInfoResponse.SessionStatus._text === 'Active') {
            if (data.viewSiteInfoResponse) {
              if (data.viewSiteInfoResponse.SiteName._text !== '') {
                this.siteData = data.viewSiteInfoResponse;
              } else {
                // data.viewSiteInfoResponse.SiteName._text = 'Marked Site';
                this.siteData = data.viewSiteInfoResponse;
                this.siteData.SiteName._text = 'Marked Site';
              }

              console.log('this.siteData=>', this.siteData);


              if (this.siteData) {
                if (this.siteData.TankList.Tank && this.siteData.TankList.Tank.length > 0) {
                  // console.log('if :: Tank detail in array => ', this.siteData.TankList.Tank);
                  this.siteData.TankList.Tank.map(el => {

                    el.TankCurrentTemp._text = Math.round(el.TankCurrentTemp._text);

                    let colorCode;
                    let tankLevel;
                    tankLevel = (el.TankCurrentLevelPCT._text);
                    // tankLevel = el.TankCurrentLevelPCT._text.replace('%', '');
                    if ((tankLevel) > 0 && tankLevel < 40) {
                      // red
                      colorCode = '#f70505';
                    } else if (tankLevel > 40 && tankLevel < 70) {
                      // orange
                      colorCode = '#ffa500';
                    } else if (tankLevel > 70 && tankLevel < 100) {
                      // green
                      colorCode = '#6c9f43';
                    }
                    const dataSource = {

                      chart: {
                        chartLeftMargin: '0',
                        // chartTopMargin: '0',
                        chartRightMargin: '0',
                        chartBottomMargin: '0',
                        captionPadding: '0',
                        caption: Math.round(el.TankCurrentLevel._text).toLocaleString('en-GB') + ' gal',
                        captionFontSize: '20',
                        captionFontColor: '#2e3192',
                        valueFontSize: '18',
                        valueFontColor: '#4a4a4a',
                        valueFontBold: '1',
                        lowerLimit: '0',
                        upperLimit: '100',
                        showValue: '1',
                        numberSuffix: '%',
                        theme: 'fusion',
                        showToolTip: '0',
                        showTickMarks: '0',
                        showTickValues: '0',
                        // xAxisValueDecimals: "2",
                        formatNumber: '0',
                        // decimals: "2",
                        // forceDecimals: "0",
                      },
                      colorRange: {
                        color: [
                          {
                            minValue: '0',
                            maxValue: '100',
                            code: '#c0cad2'
                          },
                          {
                            minValue: '0',
                            maxValue: tankLevel,
                            code: colorCode
                          }
                        ]
                      },
                      dials: {
                        dial: [{
                          value: (el.TankCurrentLevelPCT._text)
                        }]
                      }
                    };
                    el.chartData = dataSource;
                    this.siteData.TankList.Tank.sort((a, b) => {
                      const c = new Date(a.TankName._text).getTime();
                      const d = new Date(b.TankName._text).getTime();
                      return d - c;
                    });
                  });
                } else {
                  // console.log('ele :: object : tank data => ', this.siteData.TankList.Tank);
                  if (this.siteData.TankList.Tank) {
                    this.siteData.TankList.Tank.TankCurrentTemp._text = Math.round(this.siteData.TankList.Tank.TankCurrentTemp._text);
                    let colorCode;
                    let tankLevel;
                    // tankLevel = this.siteData.TankList.Tank.TankCurrentLevelPCT._text.replace('%', '');
                    tankLevel = (this.siteData.TankList.Tank.TankCurrentLevelPCT._text);
                    if ((tankLevel) > 0 && tankLevel < 40) {
                      // red
                      colorCode = '#f70505';
                    } else if (tankLevel > 40 && tankLevel < 70) {
                      // orange
                      colorCode = '#ffa500';
                    } else if (tankLevel > 70 && tankLevel < 100) {
                      // green
                      colorCode = '#6c9f43';
                    }
                    const dataSource = {
                      chart: {
                        chartLeftMargin: '0',
                        chartTopMargin: '0',
                        chartRightMargin: '0',
                        chartBottomMargin: '0',
                        captionPadding: '0',
                        caption: Math.round(this.siteData.TankList.Tank.TankCurrentLevel._text).toLocaleString('en-GB') + ' gal',
                        captionFontSize: '20',
                        captionFontColor: '#2e3192',
                        valueFontSize: '18',
                        valueFontColor: '#4a4a4a',
                        valueFontBold: '1',
                        lowerLimit: '0',
                        upperLimit: '100',
                        showValue: '1',
                        numberSuffix: '%',
                        theme: 'fusion',
                        showToolTip: '0',
                        showTickMarks: '0',
                        showTickValues: '0'
                      },
                      // chart: {
                      //   hartLeftMargin: '0',
                      //   chartTopMargin: '0',
                      //   chartRightMargin: '0',
                      //   chartBottomMargin: '0',
                      //   captionPadding: '0',
                      //   caption: Math.round(this.siteData.TankList.Tank.TankCurrentLevel._text) + ' gal',
                      //   lowerLimit: '0',
                      //   upperLimit: '100',
                      //   showValue: '1',
                      //   numberSuffix: '%',
                      //   theme: 'fusion',
                      //   showToolTip: '0',
                      //   showTickMarks: '0',
                      //   showTickValues: '0',
                      //   captionFontColor: '#2e3192',
                      //   valueFontSize: '15px'
                      // },
                      colorRange: {
                        color: [
                          {
                            minValue: '0',
                            maxValue: '100',
                            code: '#c0cad2'
                          },
                          {
                            minValue: '0',
                            maxValue: tankLevel,
                            code: colorCode
                          }
                        ]
                      },
                      dials: {
                        dial: [{
                          value: (this.siteData.TankList.Tank.TankCurrentLevelPCT._text)
                        }]
                      }
                    };
                    this.siteData.TankList.Tank.chartData = dataSource;
                  }
                }
              }
              // console.log('siteData  :: Final Array => ', this.siteData);
            } else {
              this.siteData = [];
              this.toastr.error('Error occurred, Please try again later!');
            }
          } else {
            this.router.navigate(['']);
            localStorage.removeItem('userData');
            this.dataShareService.setBottomSheet({});
          }
        }, (err) => {
          console.log('err => ', err);
          this.siteData = [];
        });
      } else {
        this.siteData = [];
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


  }

  ngOnInit(): void {
  }

  // Bottom sheet for Tank Detail
  openTankDetail(siteId, tankId) {
    console.log('siteId,tankId => ', siteId, tankId);
    // Data share service to manage Tank detail bottomsheet
    this.dataShareService.setTankDetail({ siteId, tankId });
    this.dataShareService.setBottomSheet({ step: 3, targetComponent: 'tankDetail' });
  }

  // To close marked sheet
  closeMarkedSite() {
    console.log('here in mark site clse=======>');
    if (document.getElementsByClassName('HeaderBar')[0].classList.contains('HeaderNone')) {
      document.getElementsByClassName('HeaderBar')[0].classList.remove('HeaderNone');
    }
    this.dataShareService.setCloseTabData({ Component: 'markedSite' });
    if (this.activatedRoute.snapshot['_routerState'].url === '/sites') {
      this.dataShareService.getHistoryFormData.subscribe(res => {
        console.log('res=>', res);

        if (res) {
          if (res.level === '1') {
            const sheetHTML = document.getElementsByClassName('SitesList BodyContent');
            sheetHTML[0].classList.add('active');
          } else {
            document.getElementsByClassName('SitesList BodyContent')[0].classList.remove('active');
          }
        } else {
          const sheetHTML = document.getElementsByClassName('SitesList BodyContent');
          sheetHTML[0].classList.add('active');
        }
      });

    }
  }

  // Place an order on
  placeOrder() {

    let obj = {
      site: this.siteData.SiteID._text,
      tank: '',
      item: '',
      qty: '',
      type: 'marked'
    }
    this.dataShareService.setTankOrderData(obj);
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'addOrder' });
  }

  // swipe up handler
  swipeUpHandlerSite(step) {
    console.log('step from here up mark=>', step);
    if (step > 0 && step < 3) {
      this.step = step + 1;
      this.bottomSheetLevel(this.step);
    }
  }

  // swipe down handler
  swipeDownHandlerSite(step) {

    if (step > 1 && step < 4) {
      this.step = step - 1;
      this.bottomSheetLevel(this.step);
    }
  }

  // open Add order form
  openAddOrder() {
    // this.bottomSheetLevel(4);
    // this.bottomSheetContent('addOrder');
  }


  // Handle Bottom sheet height as per steps
  bottomSheetLevel(step) {

    // Get Bottomsheet HTML using bottomsheet div class - use this class to manage height of Bottomsheet
    const sheetHTML = document.getElementsByClassName('MarkedSitePage OuterBox');

    let classArray = [];
    if (step === 1) {
      // Bottom sheet level 1
      sheetHTML[0].classList.add('StepOne');
      document.getElementById('stepHeightSite').style.height = '75px';
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
      document.getElementById('stepHeightSite').style.height = '330px';
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
      // Bottom sheet level 3 manage heigth
      let height = window.innerHeight - 40;

      sheetHTML[0].classList.add('StepThree');


      if (this.activatedRoute.snapshot['_routerState'].url === '/sites/map') {

        this.currentLocationIcon = false;
      }

      // document.getElementById('stepHeightSite').style.height = '580px';
      document.getElementById('stepHeightSite').style.height = height + 'px';
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

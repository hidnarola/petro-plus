import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataShareService } from 'src/app/shared/data-share.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-sites',
  templateUrl: './list-sites.component.html',
  styleUrls: ['./list-sites.component.scss']
})
export class ListSitesComponent implements OnInit {
  siteList = [];

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,
    private dataShareService: DataShareService
  ) {
    this.spinner.show();
    this.siteList = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    console.log('siteList => ', this.siteList);
    this.siteList.map(ele => {
      if (ele.TankList.Tank && ele.TankList.Tank.length > 0) {
        ele.TankList.Tank.map(el => {
          let colorCode;
          let tankLevel;
          console.log('el.TankCurrentLevel._text ====> ', el.TankCurrentLevel._text);
          // tankLevel = el.TankCurrentLevelPCT._text.replace('%', '');
          tankLevel = el.TankCurrentLevelPCT._text * 100;
          console.log('tankLevel => ', tankLevel);
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

          // let x = (el.TankCurrentLevelPCT._text);
          // console.log('el.TankCurrentLevel._text => ', el.TankCurrentLevel._text);

          // console.log('el.TankCurrentLevelPCT._text => ', x);
          // console.log('el.TankCurrentLevelPCT._text => ', (x * 100).toFixed(1));
          console.log(' (el.TankCurrentLevelPCT._text * 100).toFixed(1) => ', (el.TankCurrentLevelPCT._text * 100).toFixed(1));
          let x = (el.TankCurrentLevelPCT._text * 100).toFixed(1);
          const dataSource = {
            chart: {
              chartLeftMargin: '0',
              chartTopMargin: '0',
              chartRightMargin: '0',
              chartBottomMargin: '0',
              captionPadding: '0',
              caption: Math.round(el.TankCurrentLevel._text) + ' gal',
              captionFontColor: '#2e3192',
              valueFontSize: '22',
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
                value: (el.TankCurrentLevelPCT._text * 100).toFixed(1),
                bgColor: '#4a4a4a'
              }]
            }
          };
          el.chartData = dataSource;
        });
      } else {
        // console.log('ele : object : tank data => ', ele);
        if (ele.TankList.Tank) {
          let colorCode;
          let tankLevel;
          tankLevel = ele.TankList.Tank.TankCurrentLevelPCT._text * 100;
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
              caption: Math.round(ele.TankList.Tank.TankCurrentLevel._text) + ' gal',
              captionFontColor: '#2e3192',
              valueFontSize: '22',
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
                value: (ele.TankList.Tank.TankCurrentLevelPCT._text * 100).toFixed(2),
                bgColor: '#4a4a4a'
              }]
            }
          };
          ele.TankList.Tank.chartData = dataSource;
        }
      }
    });
    this.spinner.hide();
    // console.log('siteList => ', JSON.stringify(this.siteList[0].TankList.Tank));
  }

  ngOnInit(): void {
    this.dataShareService.manageCurrentLocationIcon({ currentLocation: false });
  }

  // switch between map view and list view for site Listing
  switchView() {
    this.router.navigate(['/sites/map']);
    this.dataShareService.manageHeader({ mapView: true });
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
    this.dataShareService.manageCurrentLocationIcon({ currentLocation: true });
    this.dataShareService.setMarkedSiteDetail({ isMarked: false });
  }

  // Manage Bottom Sheet for add order
  manageBootomSheet() {
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'addOrder' });
  }

  // Bottom sheet for Tank Detail
  openTankDetail(siteId, tankId) {
    console.log('siteId,tankId => ', siteId, tankId);
    // Data share service to manage Tank detail bottomsheet
    this.dataShareService.setTankDetail({ siteId, tankId });
    this.dataShareService.setBottomSheet({ step: 3, targetComponent: 'tankDetail' });
  }
}

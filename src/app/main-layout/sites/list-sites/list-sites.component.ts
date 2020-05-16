import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-list-sites',
  templateUrl: './list-sites.component.html',
  styleUrls: ['./list-sites.component.scss']
})
export class ListSitesComponent implements OnInit {
  siteList = [];

  constructor(
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
          tankLevel = el.TankCurrentLevelPCT._text.replace('%', '');
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
              caption: el.TankCurrentLevel._text + ' gal',
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
                value: el.TankCurrentLevelPCT._text
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
          tankLevel = ele.TankList.Tank.TankCurrentLevelPCT._text.replace('%', '');
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
              caption: ele.TankList.Tank.TankCurrentLevel._text + ' gal',
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
                value: ele.TankList.Tank.TankCurrentLevelPCT._text
              }]
            }
          };
          ele.TankList.Tank.chartData = dataSource;
        }
      }
    });
    this.spinner.hide();
  }

  ngOnInit(): void {
  }

  // Manage Bottom Sheet for add order
  manageBootomSheet() {
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'addOrder' });
  }

}

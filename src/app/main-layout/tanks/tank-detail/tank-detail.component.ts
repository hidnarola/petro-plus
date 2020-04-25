import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tank-detail',
  templateUrl: './tank-detail.component.html',
  styleUrls: ['./tank-detail.component.scss']
})
export class TankDetailComponent implements OnInit {

  siteId;
  tankId;
  siteList;
  tankDetail;
  // chart 1
  cylinderChartConfig;
  cylinderChartData;
  // chart 2
  barChartConfig;
  barChartData;
  // chart 3
  multiAxisChartConfig1;
  multiAxisChartData1;
  // chart 4
  multiAxisChartConfig2;
  multiAxisChartData2;
  // chart 5
  signalChartConfig;
  signalChartData;
  dataSource;
  chartConfig;

  constructor(
    private activateRoute: ActivatedRoute
  ) {
    console.log('this.activateRoute.snapshot.params => ', this.activateRoute.snapshot.params);
    this.siteId = this.activateRoute.snapshot.params.site_id;
    this.tankId = this.activateRoute.snapshot.params.tank_id;
    console.log('this.siteId, this.tankId => ', this.siteId, this.tankId);
    this.siteList = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    console.log('siteList => ', this.siteList);
    this.getTankDetail(this.siteId, this.tankId);



    this.chartConfig = {
      width: '300',
      height: '300',
      type: 'cylinder',
      dataFormat: 'json',
    };

    this.dataSource = {
      chart: {
        caption: '70.1%',
        lowerLimit: '0',
        upperLimit: '100',
        lowerLimitDisplay: 'Empty',
        upperLimitDisplay: 'Full',
        numberSuffix: '%',
        plottooltext: 'Oxygen Pressure: <b>$dataValue</b>',
        theme: 'fusion',
        cylFillColor: '#1aaf5d'
      },
      value: '70.1'
    };



  }

  ngOnInit(): void {

  }

  // Get Tank Details
  getTankDetail(siteId, tankId) {
    this.siteList.map(ele => {
      // console.log('ele => ', ele);
      if (ele.SiteID._text === siteId) {
        if (ele.TankList.Tank && ele.TankList.Tank.length > 0) {
          ele.TankList.Tank.map(el => {
            // console.log('el => ', el);
            if (el.TankID._text === tankId) {
              this.tankDetail = el;
            }
          });
        } else {
          // console.log('ele.TankList.Tank => ', ele.TankList.Tank);
          if (ele.TankList.Tank.TankID._text === tankId) {
            this.tankDetail = ele.TankList.Tank;
          }
        }
        console.log('tankDetail => ', this.tankDetail);
        // Bind chart value
        this.chartData(this.tankDetail);
      }
    });
  }

  // Bind chart value
  chartData(data) {
    console.log('data => ', data);

    // chart 1 - cylinder chart
    this.cylinderChartConfig = {
      width: '300',
      height: '230',
      type: 'cylinder',
      dataFormat: 'json',
    };
    this.cylinderChartData = {
      chart: {
        caption: data.TankCurrentLevelPCT._text,
        // caption: '70.1%',
        lowerLimit: '0',
        upperLimit: '100',
        lowerLimitDisplay: 'Empty',
        upperLimitDisplay: 'Full',
        numberSuffix: '%',
        plottooltext: 'Oxygen Pressure: <b>$dataValue</b>',
        theme: 'fusion',
        cylFillColor: '#00ef06',
      },
      value: '70.1'
    };

    // chart 2 - bar chart
    this.barChartConfig = {
      width: '300',
      height: '300',
      type: 'Column2d',
      dataFormat: 'json',
    };
    this.barChartData = {
      chart: {
        // Set the chart caption
        caption: 'Countries With Most Oil Reserves [2017-18]',
        // Set the chart subcaption
        subCaption: 'In MMbbl = One Million barrels',
        // Set the x-axis name
        xAxisName: 'Country',
        // Set the y-axis name
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K',
        // Set the theme for your chart
        theme: 'fusion'
      },
      // Chart Data - from step 2
      data: [
        {
          label: 'Venezuela',
          value: '290'
        }
      ]
    };

    // chart 3 - muilti axes 1
    this.multiAxisChartConfig1 = {
      width: '800',
      height: '500',
      type: 'multiaxisline',
      dataFormat: 'json',
    };
    this.multiAxisChartData1 = {
      chart: {
        caption: 'CPU Usage',
        subcaption: '(Last 10 Hours)',
        xaxisname: 'Time',
        numvdivlines: '4',
        vdivlinealpha: '0',
        alternatevgridalpha: '5',
        labeldisplay: 'ROTATE',
        theme: 'fusion'
      },
      data: [
        {
          label: 'Venezuela',
          value: '290'
        }
      ],
      "categories": [
        {
          "category": [
            {
              "label": "10:00"
            },
            {
              "label": "11:00"
            },
            {
              "label": "12:00"
            },
            {
              "label": "13:00"
            },
            {
              "label": "14:00"
            },
            {
              "label": "15:00"
            },
            {
              "label": "16:00"
            },
            {
              "label": "17:00"
            },
            {
              "label": "18:00"
            },
            {
              "label": "19:00"
            }
          ]
        }
      ],
      "axis": [
        {
          "title": "CPU Usage",
          "tickwidth": "10",
          "divlineDashed": "1",
          "numbersuffix": "%",
          "dataset": [
            {
              "seriesname": "CPU 1",
              "linethickness": "3",
              "color": "CC0000",
              "data": [
                {
                  "value": "16"
                },
                {
                  "value": "19"
                },
                {
                  "value": "16"
                },
                {
                  "value": "17"
                },
                {
                  "value": "23"
                },
                {
                  "value": "23"
                },
                {
                  "value": "15"
                },
                {
                  "value": "14"
                },
                {
                  "value": "19"
                },
                {
                  "value": "21"
                }
              ]
            },
            {
              "seriesname": "CPU 2",
              "linethickness": "3",
              "color": "0372AB",
              "data": [
                {
                  "value": "12"
                },
                {
                  "value": "12"
                },
                {
                  "value": "9"
                },
                {
                  "value": "9"
                },
                {
                  "value": "11"
                },
                {
                  "value": "13"
                },
                {
                  "value": "16"
                },
                {
                  "value": "14"
                },
                {
                  "value": "16"
                },
                {
                  "value": "11"
                }
              ]
            }
          ]
        },
        {
          "title": "PF Usage",
          "axisonleft": "0",
          "numdivlines": "4",
          "tickwidth": "10",
          "divlineDashed": "1",
          "formatnumberscale": "1",
          "defaultnumberscale": " MB",
          "numberscaleunit": "GB",
          "numberscalevalue": "1024",
          "dataset": [
            {
              "seriesname": "PF Usage",
              "data": [
                {
                  "value": "696"
                },
                {
                  "value": "711"
                },
                {
                  "value": "636"
                },
                {
                  "value": "671"
                },
                {
                  "value": "1293"
                },
                {
                  "value": "789"
                },
                {
                  "value": "793"
                },
                {
                  "value": "993"
                },
                {
                  "value": "657"
                },
                {
                  "value": "693"
                }
              ]
            }
          ]
        },
        {
          "title": "Processes",
          "axisonleft": "0",
          "numdivlines": "5",
          "tickwidth": "10",
          "divlineDashed": "1",
          "dataset": [
            {
              "seriesname": "Processes",
              "data": [
                {
                  "value": "543"
                },
                {
                  "value": "511"
                },
                {
                  "value": "536"
                },
                {
                  "value": "449"
                },
                {
                  "value": "668"
                },
                {
                  "value": "588"
                },
                {
                  "value": "511"
                },
                {
                  "value": "536"
                },
                {
                  "value": "449"
                },
                {
                  "value": "668"
                }
              ]
            }
          ]
        }
      ]
    };


  }



}

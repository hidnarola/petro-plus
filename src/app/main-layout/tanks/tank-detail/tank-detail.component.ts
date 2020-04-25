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
      width: '230',
      height: '230',
      type: 'Column2d',
      dataFormat: 'json',
    };
    this.barChartData = {
      chart: {
        theme: 'fusion',
        yAxisPosition: 'right',
        yAxisMaxValue: '1',
        yAxisMinValue: '0.6',
        showHoverEffect: '0',
        plotHoverEffect: '0',
        showToolTip: '0',
        plotGradientColor: 'ffa300',
        usePlotGradientColor: '1',
        // plotFillAngle: '15',
      },
      // Chart Data - from step 2
      data: [
        {
          // label: 'Venezuela',
          value: '1',
          color: 'f80b05'
        }
      ],
      trendlines: [
        {
          line: [
            {
              startvalue: '0.87',
              valueOnRight: '0',
              displayvalue: '.87',
              showOnTop: '1',
              color: '373737',
            }
          ]
        }
      ]
    };

    // chart 3 - multi axes 1
    this.multiAxisChartConfig1 = {
      width: '800',
      height: '500',
      type: 'multiaxisline',
      dataFormat: 'json',
    };
    this.multiAxisChartData1 = {
      chart: {
        caption: 'Fuel Level Historical Timeline',
        xaxisname: 'Time',
        numvdivlines: '4',
        vdivlinealpha: '0',
        alternatevgridalpha: '5',
        // labeldisplay: 'ROTATE',
        labeldisplay: 'auto',
        theme: 'fusion'
      },
      categories: [
        {
          category: [
            {
              label: '10:00'
            },
            {
              label: '11:00'
            },
            {
              label: '12:00'
            },
            {
              label: '13:00'
            },
            {
              label: '14:00'
            },
            {
              label: '15:00'
            },
            {
              label: '16:00'
            },
            {
              label: '17:00'
            },
            {
              label: '18:00'
            },
            {
              label: '19:00'
            }
          ]
        }
      ],
      axis: [
        {
          title: '%',
          tickwidth: '10',
          divlineDashed: '1',
          // numbersuffix: '%',
          color: '0024b8',
          minValue: '0',
          dataset: [
            {
              seriesname: 'Fuel Level',
              color: '0024b8',
              drawAnchors: '1',
              anchorBgColor: 'ffe300',
              anchorBorderColor: '0024b8',
              anchorBorderThickness: '2',
              data: [
                {
                  value: '40'
                },
                {
                  value: '50'
                },
                {
                  value: '55'
                },
                {
                  value: '52'
                },
                {
                  value: '60'
                },
                {
                  value: '90'
                },
                {
                  value: '75'
                },
                {
                  value: '70'
                },
                {
                  value: '50'
                },
                {
                  value: '65'
                }
              ]
            }
          ]
        },
        {
          title: '°C',
          axisonleft: '0',
          numdivlines: '4',
          tickwidth: '10',
          divlineDashed: '1',
          formatnumberscale: '1',
          // defaultnumberscale: ' MB',
          // numberscaleunit: 'GB',
          // numberscalevalue: '1024',
          color: 'ff1414',
          minValue: '0',
          divLineAlpha: '5',
          dataset: [
            {
              seriesname: 'Temperature',
              linethickness: '3',
              color: 'ff1414',
              data: [
                {
                  value: '25'
                },
                {
                  value: '28'
                },
                {
                  value: '35'
                },
                {
                  value: '45'
                },
                {
                  value: '40'
                },
                {
                  value: '41'
                },
                {
                  value: '42'
                },
                {
                  value: '45'
                },
                {
                  value: '34'
                },
                {
                  value: '35'
                }
              ]
            }
          ]
        }
      ]
    };

    // chart 4 - multi axes 2
    this.multiAxisChartConfig2 = {
      width: '800',
      height: '500',
      type: 'multiaxisline',
      dataFormat: 'json',
    };
    this.multiAxisChartData2 = {
      chart: {
        caption: 'Fuel Density Historical Timeline',
        xaxisname: 'Time',
        numvdivlines: '4',
        vdivlinealpha: '0',
        alternatevgridalpha: '5',
        // labeldisplay: 'ROTATE',
        labeldisplay: 'auto',
        theme: 'fusion'
      },
      categories: [
        {
          category: [
            {
              label: '10:00'
            },
            {
              label: '11:00'
            },
            {
              label: '12:00'
            },
            {
              label: '13:00'
            },
            {
              label: '14:00'
            },
            {
              label: '15:00'
            },
            {
              label: '16:00'
            },
            {
              label: '17:00'
            },
            {
              label: '18:00'
            },
            {
              label: '19:00'
            }
          ]
        }
      ],
      axis: [
        {
          title: 'kg/l',
          tickwidth: '10',
          divlineDashed: '1',
          // numbersuffix: '%',
          color: '0024b8',
          minValue: '0',
          dataset: [
            {
              seriesname: 'Density',
              color: 'f35d02',
              drawAnchors: '1',
              anchorBgColor: '0024b8',
              anchorBorderColor: 'f35d02',
              anchorBorderThickness: '2',
              data: [
                {
                  value: '40'
                },
                {
                  value: '50'
                },
                {
                  value: '55'
                },
                {
                  value: '52'
                },
                {
                  value: '60'
                },
                {
                  value: '90'
                },
                {
                  value: '75'
                },
                {
                  value: '70'
                },
                {
                  value: '50'
                },
                {
                  value: '65'
                }
              ]
            }
          ]
        },
        {
          title: '°C',
          axisonleft: '0',
          numdivlines: '4',
          tickwidth: '10',
          divlineDashed: '1',
          formatnumberscale: '1',
          color: 'ff1414',
          minValue: '0',
          divLineAlpha: '5',
          dataset: [
            {
              seriesname: 'Temperature',
              linethickness: '3',
              color: 'ff1414',
              data: [
                {
                  value: '25'
                },
                {
                  value: '28'
                },
                {
                  value: '35'
                },
                {
                  value: '45'
                },
                {
                  value: '40'
                },
                {
                  value: '41'
                },
                {
                  value: '42'
                },
                {
                  value: '45'
                },
                {
                  value: '34'
                },
                {
                  value: '35'
                }
              ]
            }
          ]
        }
      ]
    };


  }



}

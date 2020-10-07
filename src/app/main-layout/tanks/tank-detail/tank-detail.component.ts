import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/crud.service';
import * as moment from 'moment';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-tank-detail',
  templateUrl: './tank-detail.component.html',
  styleUrls: ['./tank-detail.component.scss']
})
export class TankDetailComponent implements OnInit {

  siteId;
  siteName;
  tankId;
  siteList;
  tankDetail;
  tankData;
  // chart 1
  cylinderChartConfig;
  cylinderChartData;
  // chart 2
  barChartConfig;
  barChartData;
  // chart 3
  multiAxisChartConfig1: {};
  multiAxisChartData1: {};
  // chart 4
  multiAxisChartConfig2: {};
  multiAxisChartData2: {};
  // chart 5
  signalChartConfig;
  signalChartData;
  dataSource;
  chartConfig;
  timeArray = [];
  fuelLevelDataArray = [];
  temperatureDataArray = [];
  densityDataArray = [];
  toDate = moment().format('L');
  yesterDate = moment().subtract(1, 'days').format('L');
  tankChartDetailData = [];
  userData: any;
  config: zingchart.graphset = {};
  // config: zingchart.graphset = {
  //   type: 'bar',
  //   series: [
  //     {
  //       values: [20, 40, 25, 50, 15, 45, 33, 34],
  //       'gradient-colors': 'yellow orange red green blue purple',
  //       'gradient-stops': '.4 .5 .6 .7 .8 .9'
  //     }
  //   ],
  // };


  constructor(
    private activateRoute: ActivatedRoute,
    private service: CrudService,
    private dataShareService: DataShareService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    // this.siteId = this.activateRoute.snapshot.params.site_id;
    // this.tankId = this.activateRoute.snapshot.params.tank_id;
    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.siteList = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    console.log('this.siteList => ', this.siteList);
    // this.getTankDetail(this.siteId, this.tankId);
    this.dataShareService.tankDetail.subscribe(res => {

      if (res) {
        this.getTankDetail(res.siteId, res.tankId);
        this.siteId = res.siteId;
        this.tankId = res.tankId;
      }
    });

    const body = `intTank=${this.tankId}&` +
      `datBegin=${this.yesterDate}&` +
      `dateEnd=${this.toDate}&`
      + `strToken=${this.userData.TokenID._text}`;
    this.service.post('GetTankHistoricalData', body).subscribe(res => {
      const data = this.commonService.XMLtoJson(res, true);

      let tankdataArray = [];

      if (data.elements[0].elements[1].elements && data.elements[0].elements[1].elements[0].elements) {
        tankdataArray = data.elements[0].elements[1].elements[0].elements;
        tankdataArray.map((element, index) => {
          const detailObj = {};
          element.elements.map((ele, i) => {
            if (ele.name === 'ReadingID') {
              detailObj['ReadingID'] = ele.elements[0].text;
            }
            if (ele.name === 'Volume') {
              detailObj['volume'] = ele.elements[0].text;
            }
            if (ele.name === 'Units') {
              detailObj['Units'] = ele.elements[0].text;
            }
            if (ele.name === 'Temperature') {
              detailObj['Temperature'] = ele.elements[0].text;
            }
            if (ele.name === 'Density') {
              detailObj['Density'] = ele.elements[0].text;
            }
            if (ele.name === 'Time') {
              detailObj['Time'] = ele.elements[0].text;
            }
            if (ele.name === 'Tanklevel_Percentage') {
              detailObj['Tanklevel_Percentage'] = ele.elements[0].text;
            }
          });
          this.tankChartDetailData[index] = detailObj;
        });
        // console.log('this.tankChartDetailData =======> ', this.tankChartDetailData);
        // this.multiAxesChartData(this.tankChartDetailData);


        // Bind value to Multi axes charts
        this.tankChartDetailData.map(element => {
          // console.log('element => ', element);
          this.timeArray.push({ label: moment(element.Time).format('HH:mm:ss DD-MM-YYYY') });
          this.temperatureDataArray.push({ value: element.Temperature });
          this.fuelLevelDataArray.push({ value: element.Tanklevel_Percentage });
          this.densityDataArray.push({ value: element.Density });
        });
      }





      // get tank data
      this.service.post('ViewTankInfo', `IntTankID=${this.tankId}&` + `strToken=${this.userData.TokenID._text}`).subscribe(response => {
        if (response) {
          const tankData = this.commonService.XMLtoJson(response);
          this.tankData = tankData.viewTankInfoResponse;
        }
      });

      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      console.log('err => ', err);
    });

  }

  // Place an order on
  placeOrder() {


    let qty = Math.round(this.tankData.TankCapacity._text - this.tankData.TankCurrentLevel._text);


    let obj = {
      site: this.siteId,
      tank: this.tankId,
      item: this.tankData.TankCurrentItem._text,
      qty: qty,
      type: 'tank'
    }
    this.dataShareService.setTankOrderData(obj);
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'addOrder' });
  }

  ngOnInit(): void {
    window.scroll(0, 0);
  }

  // Get Tank Details
  getTankDetail(siteId, tankId) {
    console.log('siteId, tankId => ', siteId, tankId);
    this.siteList.map(ele => {
      console.log('ele => ', ele);
      if (ele.SiteID._text == siteId) {
        this.siteName = ele.SiteName._text;
        if (ele.TankList.Tank && ele.TankList.Tank.length > 0) {
          ele.TankList.Tank.map(el => {
            // console.log('el => ', el);
            if (el.TankID._text == tankId) {
              this.tankDetail = el;
            }
          });
        } else {
          // console.log('ele.TankList.Tank => ', ele.TankList.Tank);
          if (ele.TankList.Tank.TankID._text === tankId) {
            this.tankDetail = ele.TankList.Tank;
          }
        }
        // console.log('tankDetail => ', this.tankDetail);
        // Bind chart value
        this.chartData(this.tankDetail);
      }
    });
  }

  // Bind chart value
  chartData(data) {
    // console.log('data => ', data);
    console.log(' data.TankCurrentLevel._text => ', data.TankCurrentLevel._text);
    // chart 1 - cylinder chart
    this.cylinderChartConfig = {
      width: '300',
      height: '230',
      type: 'cylinder',
      dataFormat: 'json',
    };
    this.cylinderChartData = {
      chart: {
        // caption: (data.TankCurrentLevel._text),
        caption: (data.TankCurrentLevelPCT._text) + '%',
        captionOnTop: '0',
        lowerLimit: '0',
        upperLimit: data.TankCapacity._text,
        // upperLimit: data.TankCurrentLevel._text,
        // upperLimit: data.TankCurrentLevelPCT._text,
        // upperLimit: '100',
        lowerLimitDisplay: '0',
        // upperLimitDisplay: '100',
        upperLimitDisplay: data.TankCapacity._text,
        // upperLimitDisplay: data.TankCurrentLevel._text,
        // numberSuffix: '%',
        plottooltext: 'Current Level: <b>$dataValue</b>',
        theme: 'fusion',
        cylFillColor: '#00ef06',
      },
      // value: data.TankCurrentLevelPCT._text
      value: data.TankCurrentLevel._text
    };

    // chart 2 - bar chart
    // this.barChartConfig = {
    //   width: '230',
    //   height: '230',
    //   type: 'Column2d',
    //   dataFormat: 'json',
    // };
    // this.barChartData = {
    //   chart: {
    //     theme: 'fusion',
    //     yAxisPosition: 'right',
    //     yAxisMaxValue: '1',
    //     yAxisMinValue: '0.6',
    //     showHoverEffect: '0',
    //     plotHoverEffect: '0',
    //     showToolTip: '0',
    //     plotGradientColor: 'ffa300',
    //     usePlotGradientColor: '1',
    //     // plotFillAngle: '15',
    //   },
    //   // Chart Data - from step 2
    //   data: [
    //     {
    //       // label: 'Venezuela',
    //       value: '1',
    //       color: 'f80b05'
    //     }
    //   ],
    //   trendlines: [
    //     {
    //       line: [
    //         {
    //           startvalue: '0.87',
    //           valueOnRight: '0',
    //           displayvalue: '.87',
    //           showOnTop: '1',
    //           color: '373737',
    //         }
    //       ]
    //     }
    //   ]
    // };


    this.barChartConfig = {
      width: '230',
      height: '230',
      type: 'overlappedcolumn2d',
      dataFormat: 'json',
    };
    let currentDensity = data.TankCurrentDensity._text;
    currentDensity = parseFloat(currentDensity) / 1000;

    console.log('currentDensity => ', currentDensity);




    this.barChartData = {
      chart: {
        theme: 'fusion',
        yAxisPosition: 'right',
        yAxisMaxValue: '1',
        yAxisMinValue: '0.6',
        showYAxisLine: '1',
        yAxisLineColor: '616161',
        showHoverEffect: '0',
        plotHoverEffect: '0',
        showToolTip: '0',
        plotGradientColor: ['FFA500', '709d43', 'FFA500', 'f80b05'],
        usePlotGradientColor: '1',
        trendValueFontSize: 22,
        trendValueFontBold: 1
        // bgImage: 'assets/images/white-bg.png',
        // bgColor: '#00ef06'
        // canvasLeftPadding: 50
        // plotFillAngle: '15',
      },
      // Chart Data - from step 2
      categories: [
        {
          category: [
            {},
          ]
        }
      ],
      dataset: [
        {
          data: [
            {
              value: '1',
              color: 'f80b05'
            },
          ]
        },
        {
          data: [
            {
              value: '1',
              color: 'f80b05'
            },
          ]
        }
      ],
      trendlines: [
        {
          line: [
            {
              startvalue: '0.82',
              valueOnRight: '0',
              // displayvalue: '.82',
              //  startvalue: currentDensity,
              displayvalue: data.TankCurrentDensity._text,
              showOnTop: '1',
              color: '616161',
            }
          ]
        }
      ]
    };


    // Zing chart
    this.config = {
      type: 'bar',
      'scale-y': { // define the scale to assoicate markers
        markers: [ // create marker array
          { // create n number of marker objects
            type: 'line',
            range: [0.87],
            placement: 'top',
            'line-color': '#616161',
            'background-color': '#a1a1a1',
            label: {
              'text-align': 'left',
              // 'text': "0.87"
            },
          }
        ],

        placement: 'opposite'
      },
      'scale-x': {
        'line-color': 'ffffff',
        item: {
          visible: false
        },
        tick: {
          size: 0,
          'line-width': 0,
          'line-color': 'none'
        }
      },
      plot: {
        tooltip: {
          visible: false
        },
        'hover-state': {
          // "border-width": "4px",
          // "border-color": "#000"enabled: false
        }

      },
      series: [
        {
          values: [1],
          'gradient-colors': 'red orange #709d43 orange red',
          // 'gradient-colors': 'red orange #379640 orange red',
          'gradient-stops': '.0 .3 .5 .7'
        }
      ],
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
        labeldisplay: 'ROTATE',
        // labeldisplay: 'auto',
        slantLabel: '1',
        theme: 'fusion'
      },
      categories: [
        {
          category: this.timeArray
        }
      ],
      axis: [
        {
          title: '%',
          tickwidth: '10',
          divlineDashed: '1',
          // numbersuffix: '%',
          color: 'ffffff',
          minValue: '0',
          dataset: [
            {
              seriesname: 'Fuel Level',
              color: '2b344f',
              linethickness: '4',
              // drawAnchors: '1',
              // anchorBgColor: 'ffe300',
              // anchorBorderColor: '0024b8',
              // anchorBorderThickness: '2',
              data: this.fuelLevelDataArray
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
          color: 'ffffff',
          minValue: '0',
          divLineAlpha: '5',
          dataset: [
            {
              seriesname: 'Temperature',
              // linethickness: '3',
              color: 'b00020',
              data: this.temperatureDataArray
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
        labeldisplay: 'ROTATE',
        // labeldisplay: 'auto',
        slantLabel: '1',
        theme: 'fusion'
      },
      categories: [
        {
          category: this.timeArray
        }
      ],
      axis: [
        {
          title: 'kg/l',
          tickwidth: '10',
          divlineDashed: '1',
          // numbersuffix: '%',
          color: 'ffffff',
          minValue: '0',
          dataset: [
            {
              seriesname: 'Density',
              color: 'bfa06f',
              linethickness: '4',
              // drawAnchors: '1',
              // anchorBgColor: '0024b8',
              // anchorBorderColor: 'f35d02',
              // anchorBorderThickness: '2',
              data: this.densityDataArray
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
          color: 'ffffff',
          minValue: '0',
          divLineAlpha: '5',
          dataset: [
            {
              seriesname: 'Temperature',
              color: '784b4e',
              data: this.temperatureDataArray
            }
          ]
        }
      ]
    };

    // Chart 5 - Signal chart
    this.signalChartConfig = {
      width: '400',
      height: '50',
      type: 'hled',
      dataFormat: 'json'
    };

    this.signalChartData = {
      chart: {
        numberSuffix: '%',
        tickMarkDistance: '5',
        // valueFontSize: '12',
        showValue: '0',
        showhovereffect: '1',
        // origW: '400',
        // origH: '150',
        ledSize: '25',
        ledGap: '2',
        // useSameFillColor:'1',
        manageResize: '1',
        showTickMarks: '0',
        showBorder: '1',
        borderColor: '000000',
        chartLeftMargin: '5',
        chartRightMargin: '5',
        chartBottomMargin: '5',
        chartTopMargin: '5',
        // gaugeBorderColor: 'f8f8f8',
        // gaugeBorderThickness: '5',
        // showGaugeBorder: '1',
        theme: 'fusion'
      },
      colorRange: {
        color: [
          // {
          //   minValue: '0',
          //   maxValue: '20',
          //   code: '#e41918' // Red
          // },
          // {
          //   minValue: '20',
          //   maxValue: '40',
          //   code: '#fe9601' // Yellow
          // },
          // {
          //   minValue: '40',
          //   maxValue: '60',
          //   code: '#6d9e45' // Green
          // },
          // {
          //   minValue: '60',
          //   maxValue: '80',
          //   code: '#fe9601' // Yellow
          // },
          // {
          //   minValue: '80',
          //   maxValue: '100',
          //   code: '#e41918' // Red
          // }


          {
            minValue: '0',
            maxValue: '15',
            code: '#d72a2d' // Red
            // code: '#FF0000' // Red
          },
          {
            minValue: '15',
            maxValue: '30',
            // code: '#FFA500' // Orange
            code: '#f59816' // Orange
          },
          {
            minValue: '30',
            maxValue: '60',
            // code: '#FFFF00' // Yellow
            code: '#f5ef15' // Yellow
          },
          {
            minValue: '60',
            maxValue: '80',
            // code: '#008000' // Green
            code: '#008000' // Green
          },
          {
            minValue: '80',
            maxValue: '100',
            code: '#07abd3' // Aqua
            // code: '#00FFFF' // Aqua
          }


          // {
          //   minValue: '0',
          //   maxValue: '17',
          //   code: '#e41918' // Red
          // },
          // {
          //   minValue: '17',
          //   maxValue: '33',
          //   code: '#f69c18' // Orange
          // },
          // {
          //   minValue: '33',
          //   maxValue: '49',
          //   code: '#f8e12a' // Yellow
          // },
          // {
          //   minValue: '49',
          //   maxValue: '55',
          //   code: '#c8f491' // Green
          // },
          // {
          //   minValue: '55',
          //   maxValue: '80',
          //   code: '#87d494' // Green
          // },
          // {
          //   minValue: '80',
          //   maxValue: '88',
          //   code: '#59c4b9' // blue
          // },
          // {
          //   minValue: '88',
          //   maxValue: '100',
          //   code: '#1aa5cd' // blue
          // }
        ]
      },
      value: '98'
    };

  }

  // Bind Multi- axes chart data
  multiAxesChartData(data) {
    // console.log('data :: Multi axes chart => ', data);
    const timeArray = [];
    const fuelLevelDataArray = [];
    const temperatureDataArray = [];
    const densityDataArray = [];

    // data.map(element => {
    //   console.log('element => ', element);
    //   timeArray.push({ label: element.Time });
    //   temperatureDataArray.push({ value: element.Temperature });
    //   densityDataArray.push({ value: element.Density });
    // });
    // console.log('timeArray => ', timeArray);

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
          color: 'ffffff',
          minValue: '0',
          dataset: [
            {
              seriesname: 'Fuel Level',
              color: '2b344f',
              linethickness: '4',
              // drawAnchors: '1',
              // anchorBgColor: 'ffe300',
              // anchorBorderColor: '0024b8',
              // anchorBorderThickness: '2',
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
          color: 'ffffff',
          minValue: '0',
          divLineAlpha: '5',
          dataset: [
            {
              seriesname: 'Temperature',
              // linethickness: '3',
              color: 'b00020',
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
          color: 'ffffff',
          minValue: '0',
          dataset: [
            {
              seriesname: 'Density',
              color: 'bfa06f',
              linethickness: '4',
              // drawAnchors: '1',
              // anchorBgColor: '0024b8',
              // anchorBorderColor: 'f35d02',
              // anchorBorderThickness: '2',
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
          color: 'ffffff',
          minValue: '0',
          divLineAlpha: '5',
          dataset: [
            {
              seriesname: 'Temperature',
              color: '784b4e',
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

  // On click of close icon
  closeTankDetail() {
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
  }

}

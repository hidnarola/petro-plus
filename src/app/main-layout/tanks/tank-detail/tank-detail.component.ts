import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudService } from 'src/app/shared/crud.service';
import * as moment from 'moment';
import { CommonService } from 'src/app/shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

  constructor(
    private activateRoute: ActivatedRoute,
    private service: CrudService,
    private commonService: CommonService,
    private spinner: NgxSpinnerService
  ) {
    console.log('constructor 1 ===========> ');
    this.spinner.show();
    this.siteId = this.activateRoute.snapshot.params.site_id;
    this.tankId = this.activateRoute.snapshot.params.tank_id;
    this.siteList = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    console.log('this.siteList => ', this.siteList);
    this.getTankDetail(this.siteId, this.tankId);

    const body = `intTank=${this.tankId}&` +
      `datBegin=${this.yesterDate}&` +
      `dateEnd=${this.toDate}&`;
    this.service.post('GetTankHistoricalData', body).subscribe(res => {
      const data = this.commonService.XMLtoJson(res, true); let tankdataArray = [];
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
        this.densityDataArray.push({ value: element.Density });
      });


      this.spinner.hide();
      console.log('data bind to multi axes charts ===========================> ');

    }, err => {
      this.spinner.hide();
      console.log('err => ', err);
    });

    console.log('constructor 2 ===========> ');

  }

  ngOnInit(): void {
  }

  // Get Tank Details
  getTankDetail(siteId, tankId) {
    console.log('tank detail ================> ');
    this.siteList.map(ele => {
      // console.log('ele => ', ele);
      if (ele.SiteID._text === siteId) {
        this.siteName = ele.SiteName._text;
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
        // console.log('tankDetail => ', this.tankDetail);
        // Bind chart value
        this.chartData(this.tankDetail);
      }
    });
  }

  // getTankHistoricalData(tankId) {
  //   console.log('historical chart data function ===========> ');
  //   const body = `intTank=${tankId}&` +
  //     `datBegin=${this.yesterDate}&` +
  //     `dateEnd=${this.toDate}&`;
  //   this.service.post('GetTankHistoricalData', body).subscribe(res => {
  //     const data = this.commonService.XMLtoJson(res, true); let tankdataArray = [];
  //     tankdataArray = data.elements[0].elements[1].elements[0].elements;
  //     tankdataArray.map((element, index) => {
  //       const detailObj = {};
  //       element.elements.map((ele, i) => {
  //         if (ele.name === 'ReadingID') {
  //           detailObj['ReadingID'] = ele.elements[0].text;
  //         }
  //         if (ele.name === 'Volume') {
  //           detailObj['volume'] = ele.elements[0].text;
  //         }
  //         if (ele.name === 'Units') {
  //           detailObj['Units'] = ele.elements[0].text;
  //         }
  //         if (ele.name === 'Temperature') {
  //           detailObj['Temperature'] = ele.elements[0].text;
  //         }
  //         if (ele.name === 'Density') {
  //           detailObj['Density'] = ele.elements[0].text;
  //         }
  //         if (ele.name === 'Time') {
  //           detailObj['Time'] = ele.elements[0].text;
  //         }
  //       });
  //       // console.log('detailObj :::: 222222222222222222222222222 ========================> ', detailObj);
  //       this.tankChartDetailData[index] = detailObj;
  //     });
  //     // console.log('this.tankChartDetailData =======> ', this.tankChartDetailData);
  //     // this.multiAxesChartData(this.tankChartDetailData);


  //     // Bind value to Mulri axes charts
  //     const timeArray = [];
  //     const fuelLevelDataArray = [];
  //     const temperatureDataArray = [];
  //     const densityDataArray = [];

  //     this.tankChartDetailData.map(element => {
  //       // console.log('element => ', element);
  //       timeArray.push({ label: moment(element.Time).format('HH:mm:ss DD-MM-YYYY') });
  //       temperatureDataArray.push({ value: element.Temperature });
  //       densityDataArray.push({ value: element.Density });
  //     });
  //     // console.log('timeArray => ', timeArray);

  //     // chart 3 - multi axes 1
  //     this.multiAxisChartConfig1 = {
  //       width: '800',
  //       height: '500',
  //       type: 'multiaxisline',
  //       dataFormat: 'json',
  //     };
  //     this.multiAxisChartData1 = {
  //       chart: {
  //         caption: 'Fuel Level Historical Timeline',
  //         xaxisname: 'Time',
  //         numvdivlines: '4',
  //         vdivlinealpha: '0',
  //         alternatevgridalpha: '5',
  //         labeldisplay: 'ROTATE',
  //         // labeldisplay: 'auto',
  //         slantLabel: '1',
  //         theme: 'fusion'
  //       },
  //       categories: [
  //         {
  //           category: timeArray
  //         }
  //       ],
  //       axis: [
  //         {
  //           title: '%',
  //           tickwidth: '10',
  //           divlineDashed: '1',
  //           // numbersuffix: '%',
  //           color: 'ffffff',
  //           minValue: '0',
  //           dataset: [
  //             {
  //               seriesname: 'Fuel Level',
  //               color: '2b344f',
  //               linethickness: '4',
  //               // drawAnchors: '1',
  //               // anchorBgColor: 'ffe300',
  //               // anchorBorderColor: '0024b8',
  //               // anchorBorderThickness: '2',
  //               data: fuelLevelDataArray
  //             }
  //           ]
  //         },
  //         {
  //           title: '°C',
  //           axisonleft: '0',
  //           numdivlines: '4',
  //           tickwidth: '10',
  //           divlineDashed: '1',
  //           formatnumberscale: '1',
  //           // defaultnumberscale: ' MB',
  //           // numberscaleunit: 'GB',
  //           // numberscalevalue: '1024',
  //           color: 'ffffff',
  //           minValue: '0',
  //           divLineAlpha: '5',
  //           dataset: [
  //             {
  //               seriesname: 'Temperature',
  //               // linethickness: '3',
  //               color: 'b00020',
  //               data: temperatureDataArray
  //             }
  //           ]
  //         }
  //       ]
  //     };

  //     // chart 4 - multi axes 2
  //     this.multiAxisChartConfig2 = {
  //       width: '800',
  //       height: '500',
  //       type: 'multiaxisline',
  //       dataFormat: 'json',
  //     };
  //     this.multiAxisChartData2 = {
  //       chart: {
  //         caption: 'Fuel Density Historical Timeline',
  //         xaxisname: 'Time',
  //         numvdivlines: '4',
  //         vdivlinealpha: '0',
  //         alternatevgridalpha: '5',
  //         labeldisplay: 'ROTATE',
  //         // labeldisplay: 'auto',
  //         slantLabel: '1',
  //         theme: 'fusion'
  //       },
  //       categories: [
  //         {
  //           category: timeArray
  //         }
  //       ],
  //       axis: [
  //         {
  //           title: 'kg/l',
  //           tickwidth: '10',
  //           divlineDashed: '1',
  //           // numbersuffix: '%',
  //           color: 'ffffff',
  //           minValue: '0',
  //           dataset: [
  //             {
  //               seriesname: 'Density',
  //               color: 'bfa06f',
  //               linethickness: '4',
  //               // drawAnchors: '1',
  //               // anchorBgColor: '0024b8',
  //               // anchorBorderColor: 'f35d02',
  //               // anchorBorderThickness: '2',
  //               data: densityDataArray
  //             }
  //           ]
  //         },
  //         {
  //           title: '°C',
  //           axisonleft: '0',
  //           numdivlines: '4',
  //           tickwidth: '10',
  //           divlineDashed: '1',
  //           formatnumberscale: '1',
  //           color: 'ffffff',
  //           minValue: '0',
  //           divLineAlpha: '5',
  //           dataset: [
  //             {
  //               seriesname: 'Temperature',
  //               color: '784b4e',
  //               data: temperatureDataArray
  //             }
  //           ]
  //         }
  //       ]
  //     };


  //     this.spinner.hide();
  //     console.log('data bind to multi axes charts ===========================> ');

  //   }, err => {
  //     console.log('err => ', err);
  //   });
  // }

  // Bind chart value
  chartData(data) {
    console.log('chart data function ===================> ');

    // console.log('data => ', data);

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
        captionOnTop: '0',
        lowerLimit: '0',
        upperLimit: data.TankCapacity._text,
        // upperLimit: '100',
        lowerLimitDisplay: '0',
        upperLimitDisplay: data.TankCapacity._text,
        // numberSuffix: '%',
        plottooltext: 'Current Level: <b>$dataValue</b>',
        theme: 'fusion',
        cylFillColor: '#00ef06',
      },
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
        plotGradientColor: 'ffa300',
        usePlotGradientColor: '1',
        // bgImage: 'assets/images/white-bg.png',
        // bgColor: '#00ef06'
        // canvasLeftPadding: 50
        // plotFillAngle: '15',
      },
      // Chart Data - from step 2
      categories: [
        {
          category: [
            {
              // label: 'Oliver'
            },
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
              startvalue: '0.87',
              valueOnRight: '0',
              displayvalue: '.87',
              showOnTop: '1',
              color: '616161',
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
            maxValue: '17',
            code: '#e41918' // Red
          },
          {
            minValue: '17',
            maxValue: '33',
            code: '#f69c18' // Orange
          },
          {
            minValue: '33',
            maxValue: '49',
            code: '#f8e12a' // Yellow
          },
          {
            minValue: '49',
            maxValue: '55',
            code: '#c8f491' // Green
          },
          {
            minValue: '55',
            maxValue: '80',
            code: '#87d494' // Green
          },
          {
            minValue: '80',
            maxValue: '88',
            code: '#59c4b9' // blue
          },
          {
            minValue: '88',
            maxValue: '100',
            code: '#1aa5cd' // blue
          }
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

}

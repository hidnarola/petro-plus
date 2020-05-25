import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-marked-site',
  templateUrl: './marked-site.component.html',
  styleUrls: ['./marked-site.component.scss']
})
export class MarkedSiteComponent implements OnInit {

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
          caption: '223.23 gal',
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
          caption: '123.23 gal',
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
    private dataShareService: DataShareService
  ) { }

  ngOnInit(): void {
  }

  closeMarkedSite() {
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
  }

}

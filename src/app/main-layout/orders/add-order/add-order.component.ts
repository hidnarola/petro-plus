import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { CrudService } from 'src/app/shared/crud.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  userData: any;
  form: FormGroup;
  isSubmitted = false;
  siteData = [];
  siteList = [];
  tankList = [];
  selectedTankData = [];
  tankValue: any;
  itemList = [
    // { label: 'Diesel', value: 'Diesel' },
    // { label: 'Propane', value: 'Propane' },
    // { label: 'Gasoline', value: 'Gasoline' },
  ];
  siteValue: any;
  value: Date;
  orderData;
  isTank = false;
  itemValue: any;
  qtyValue: any
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CrudService,
    private commonService: CommonService,
    private dataShareService: DataShareService
  ) {
    this.orderData = '';
    this.siteValue = '';
    this.tankValue = '';
    this.qtyValue = '';
    this.isTank = false;

    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.dataShareService.orderFormData.subscribe(res => {
      console.log('res edit order=>', res);

      if (res) {
        this.orderData = res;

        if (res.site !== undefined) {

          this.siteValue = res.site;
        }
        this.getTanks(this.siteValue).then(tank => {
          if (res.tank !== undefined) {
            this.tankValue = res.tank;
          }
          this.selectedTankData.map((ele) => {
            if (ele.tankValue === this.tankValue) {
              this.itemList.push({
                label: ele.itemLabel,
                value: ele.itemValue
              });
            }
          });
          if (res.item !== undefined) {
            this.itemValue = res.item;
          }
          if (res.qty !== undefined) {
            this.qtyValue = res.qty;
          }
        });
      } else {
        this.orderData = [];
      }
    });


    this.form = this.fb.group({
      site: [this.orderData.site ? this.orderData.site : '', Validators.required],
      tank: [this.orderData.tank ? this.orderData.tank : '', Validators.required],
      item: [this.orderData.item ? this.orderData.item : '', Validators.required],
      qty: [this.orderData.qty ? this.orderData.qty : '', Validators.required],
      deliveryDate: [this.orderData.deliveryDate ? this.orderData.deliveryDate : '', Validators.required]
    });
    this.siteData = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    this.siteList = this.siteData.map((ele) => {

      return { label: ele.SiteName._text, value: ele.SiteID._text };
    });

    this.dataShareService.tankOrderFormData.subscribe(res => {


      if (res !== undefined) {
        this.isTank = true;
        if (res.site !== undefined) {
          this.siteValue = res.site;
        }
        this.getTanks(this.siteValue).then(tank => {
          if (res.tank !== undefined) {
            this.tankValue = res.tank;
          }
          this.selectedTankData.map((ele) => {
            if (ele.tankValue === this.tankValue) {
              this.itemList.push({
                label: ele.itemLabel,
                value: ele.itemValue
              });
            }
          });
          if (res.item !== undefined) {
            this.itemValue = res.item;
          }
          if (res.qty !== undefined) {
            this.qtyValue = res.qty;
          }


        });



      } else {
        this.isTank = false;
      }

    })

  }


  get formControls() { return this.form.controls; }

  ngOnInit(): void {
    const bodyHeight = document.body.scrollHeight;
    const headerHeight = document.getElementsByClassName('PopupHeaderTitle')[0].clientHeight;
    const requiredHeight = bodyHeight - headerHeight;
    document.getElementsByClassName('AddOrderPage')[0]['style']['height'] = requiredHeight + 'px';
  }

  // On click of close icon
  closeAddOrder() {
    this.dataShareService.setTankOrderData({});

    this.dataShareService.setCloseTabData({ Component: 'addOrder' });
    this.isTank = false;
    this.dataShareService.setOrderData({});
    this.orderData = [];
  }

  // get tank details
  async getTanks(siteId) {
    return new Promise((pass, fail) => {
      const body = `intSiteID=${siteId}&` + `strToken=${this.userData.TokenID._text}`;
      this.service.post('GetSiteTanks', body).subscribe(res => {

        const data = this.commonService.XMLtoJson(res);
        if (data.GetSiteTanksResponse.SessionStatus._text === 'Active') {
          if (data && data.GetSiteTanksResponse) {
            if (data.GetSiteTanksResponse && data.GetSiteTanksResponse.TankList
              && data.GetSiteTanksResponse.TankList.Tank && data.GetSiteTanksResponse.TankList.Tank.length) {
              // data.GetSiteTanksResponse.TankList.Tank.map(ele => {
              //   this.tankList.push({ label: ele.TankName._text, value: ele.TankID._text });
              // });
              this.tankList = data.GetSiteTanksResponse.TankList.Tank.map(ele => {
                return { label: ele.TankName._text, value: ele.TankID._text };
              });
              // this.itemList = data.GetSiteTanksResponse.TankList.Tank.map(ele => {
              //   return { label: ele.CurrentTankItemLabel._text, value: ele.CurrentTankItem._text };
              // });
              this.selectedTankData = data.GetSiteTanksResponse.TankList.Tank.map(ele => {
                return {
                  tankLabel: ele.TankName._text,
                  tankValue: ele.TankID._text,
                  itemLabel: ele.CurrentTankItemLabel._text,
                  itemValue: ele.CurrentTankItem._text
                };
              });
            } else {
              this.tankList = [{
                label: data.GetSiteTanksResponse.TankList.Tank.TankName._text,
                value: data.GetSiteTanksResponse.TankList.Tank.TankID._text
              }];
              // this.itemList = [{
              //   label: data.GetSiteTanksResponse.TankList.Tank.CurrentTankItemLabel._text,
              //   value: data.GetSiteTanksResponse.TankList.Tank.CurrentTankItem._text
              // }];
              this.selectedTankData = [{
                tankLabel: data.GetSiteTanksResponse.TankList.Tank.TankName._text,
                tankValue: data.GetSiteTanksResponse.TankList.Tank.TankID._text,
                itemLabel: data.GetSiteTanksResponse.TankList.Tank.CurrentTankItemLabel._text,
                itemValue: data.GetSiteTanksResponse.TankList.Tank.CurrentTankItem._text
              }];
            }
          } else {
            this.tankList = [];
            this.itemList = [];
          }
          pass('done');
        } else {
          this.router.navigate(['']);
          localStorage.removeItem('userData');
          this.dataShareService.setBottomSheet({});
        }
      });
    });
  }

  // On click of site
  clickSite() {

    this.tankList = [];
    this.itemList = [];
    if (this.form.value.site) {
      this.getTanks(this.form.value.site);
    }
  }

  // on click of tank
  clickTank() {
    this.itemList = [];

    this.selectedTankData.map((ele) => {
      if (ele.tankValue === this.form.value.tank) {
        this.itemList.push({
          label: ele.itemLabel,
          value: ele.itemValue
        });
      }
    });
  }

  onSubmit(flag) {
    this.isSubmitted = true;
    // this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'reviewOrder' });
    console.log('this.form.value=>', this.form.value.site);

    if (flag) {
      // this.router.navigate(['/orders/review']);
      this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'reviewOrder' });

      // let obj ={
      //   site:
      // }
      this.orderData = '';
      this.siteValue = '';
      this.tankValue = '';
      this.qtyValue = '';
      this.isTank = false;
      this.dataShareService.setOrderData(this.form.value);
      // localStorage.setItem('orderData', JSON.stringify(this.form.value));
    }
  }

}

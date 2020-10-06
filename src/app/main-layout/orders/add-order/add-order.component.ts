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
  itemList = [
    // { label: 'Diesel', value: 'Diesel' },
    // { label: 'Propane', value: 'Propane' },
    // { label: 'Gasoline', value: 'Gasoline' },
  ];
  value: Date;
  orderData;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: CrudService,
    private commonService: CommonService,
    private dataShareService: DataShareService
  ) {

    this.userData = JSON.parse(localStorage.getItem('userData'));
    this.dataShareService.orderFormData.subscribe(res => {
      if (res) {
        this.orderData = res;
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
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
    this.orderData = [];
    this.dataShareService.setOrderData(this.orderData);
  }

  // On click of site
  clickSite() {
    this.tankList = [];
    this.itemList = [];
    if (this.form.value.site && this.form.value.site.value) {
      const body = `intSiteID=${this.form.value.site.value}&` + `strToken=${this.userData.TokenID._text}`;
      this.service.post('GetSiteTanks', body).subscribe(res => {
        console.log('res :: check for Tank detail => ', res);
        const data = this.commonService.XMLtoJson(res);
        console.log('data :: Json format :: Tanks for site => ', data.GetSiteTanksResponse);
        if (data.GetSiteTanksResponse.SessionStatus._text === 'Active') {
          if (data && data.GetSiteTanksResponse) {
            console.log('data.GetSiteTanksResponse.TankList.tank => ', data.GetSiteTanksResponse.TankList);
            console.log('data.GetSiteTanksResponse.TankList.tank => ', data.GetSiteTanksResponse.TankList['Tank']);
            if (data.GetSiteTanksResponse && data.GetSiteTanksResponse.TankList
              && data.GetSiteTanksResponse.TankList.Tank && data.GetSiteTanksResponse.TankList.Tank.length) {
              console.log('data.GetSiteTanksResponse.TankList.tank => ', data.GetSiteTanksResponse.TankList.Tank);
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
              console.log('this.tankList => ', this.tankList);
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
        } else {
          this.router.navigate(['']);
          localStorage.removeItem('userData');

        }
      });

      // this.siteData.map((ele) => {
      //   if (ele.SiteID._text === this.form.value.site.value) {
      //     if (ele.TankList.Tank && ele.TankList.Tank.length) {
      //       this.tankList = ele.TankList.Tank.map(el => {
      //         return { label: el.TankName._text, value: el.TankID._text };
      //       });
      //     } else {
      //       this.tankList = [{ label: ele.TankList.Tank.TankName._text, value: ele.TankList.Tank.TankID._text }];
      //     }
      //   }
      // });
    }
  }

  // on click of tank
  clickTank() {
    this.itemList = [];
    this.selectedTankData.map((ele) => {
      if (ele.tankValue === this.form.value.tank.value) {
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

    if (flag) {
      // this.router.navigate(['/orders/review']);
      this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'reviewOrder' });
      this.dataShareService.setOrderData(this.form.value);
      // localStorage.setItem('orderData', JSON.stringify(this.form.value));
    }
  }

}

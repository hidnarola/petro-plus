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

  form: FormGroup;
  isSubmitted = false;
  siteData = [];
  siteList = [];
  tankList = [];
  itemList = [
    { label: 'Diesel', value: 'Diesel' },
    { label: 'Propane', value: 'Propane' },
    { label: 'Gasoline', value: 'Gasoline' },
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
    this.dataShareService.orderFormData.subscribe(res => {
      console.log('res :: datashare service :: add order component=> ', res);
      if (res) {
        this.orderData = res;
      } else {
        this.orderData = [];
      }
      console.log('this.orderData :: add order component => ', this.orderData);
    });

    this.form = this.fb.group({
      site: [this.orderData.site ? this.orderData.site : '', Validators.required],
      tank: [this.orderData.tank ? this.orderData.tank : '', Validators.required],
      item: [this.orderData.item ? this.orderData.item : '', Validators.required],
      qty: [this.orderData.qty ? this.orderData.qty : '', Validators.required],
      deliveryDate: [this.orderData.deliveryDate ? this.orderData.deliveryDate : '', Validators.required]
    });
    this.siteData = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    // console.log('siteList => ', this.siteList);
    this.siteList = this.siteData.map((ele) => {
      // console.log('ele => ', ele);
      return { label: ele.SiteName._text, value: ele.SiteID._text };
    });
    console.log('siteList => ', this.siteList);
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
    const bodyHeight = document.body.scrollHeight;
    const headerHeight = document.getElementsByClassName('PopupHeaderTitle')[0].clientHeight;
    console.log('bodyHeight, headerHeight => ', bodyHeight, headerHeight);
    const requiredHeight = bodyHeight - headerHeight;
    console.log('requiredHeight => ', requiredHeight);
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
    console.log('this.form.value => ', this.form.value);
    if (this.form.value.site && this.form.value.site.value) {
      this.siteData.map((ele) => {
        if (ele.SiteID._text === this.form.value.site.value) {
          if (ele.TankList.Tank && ele.TankList.Tank.length) {
            console.log('array => ');
            this.tankList = ele.TankList.Tank.map(el => {
              return { label: el.TankName._text, value: el.TankID._text };
            });
          } else {
            console.log('object => ');
            this.tankList = [{ label: ele.TankList.Tank.TankName._text, value: ele.TankList.Tank.TankID._text }];
          }
          console.log('tankList => ', this.tankList);
        } else {
          // console.log('not matched => ');
        }
      });
    }
  }

  onSubmit(flag) {
    console.log('flag => ', flag);
    console.log('this.form.value => ', this.form.value);
    this.isSubmitted = true;
    this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'reviewOrder' });

    if (flag) {
      // this.router.navigate(['/orders/review']);
      this.dataShareService.setBottomSheet({ step: 4, targetComponent: 'reviewOrder' });
      this.dataShareService.setOrderData(this.form.value);
      // localStorage.setItem('orderData', JSON.stringify(this.form.value));
    }
  }

}

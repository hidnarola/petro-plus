import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { CrudService } from 'src/app/shared/crud.service';

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
  // siteList = [
  //   { name: 'Site 01', value: 'site1' },
  //   { name: 'Site 02', value: 'site2' },
  //   { name: 'Site 03', value: 'site3' },
  //   { name: 'Site 04', value: 'site4' },
  // ];
  // tankList = [
  //   { name: 'Tank 01', value: 'tank1' },
  //   { name: 'Tank 02', value: 'tank2' },
  //   { name: 'Tank 03', value: 'tank3' },
  //   { name: 'Tank 04', value: 'tank4' },
  // ];
  itemList = [
    { name: 'Diesel', value: 'Diesel' },
    { name: 'Propane', value: 'Propane' },
    { name: 'Gasoline', value: 'Gasoline' },
  ];
  value: Date;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private commonService: CommonService
  ) {
    this.form = this.fb.group({
      site: ['', Validators.required],
      tank: ['', Validators.required],
      item: ['', Validators.required],
      qty: ['', Validators.required],
      deliveryDate: ['', Validators.required]
    });
    this.siteData = JSON.parse(localStorage.getItem('userData')).SiteList.Site;
    console.log('siteList => ', this.siteList);
    this.siteList = this.siteData.map((ele) => {
      console.log('ele => ', ele);
      return { label: ele.SiteName._text, value: ele.SiteID._text };
    });
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
  }

  // On click of site
  clickSite() {
    console.log('site click => ');
    console.log('this.form.value => ', this.form.value.site);
    this.tankList = this.siteData.map((ele) => {
      // console.log('ele => ', ele);
      if (ele.SiteID._text == this.form.value.site) {
        console.log('matched => ');
        this.tankList = ele.TankList.Tank.map(el => {
          console.log('el => ', el);
          return { label: el.TankName._text, value: el.TankID._text };
        });
        console.log('tankList => ', this.tankList);
      } else {
        // console.log('not matched => ');
      }
    });
  }

  onSubmit(flag) {
    console.log('flag => ', flag);
    console.log('this.form.value => ', this.form.value);
    this.isSubmitted = true;

    // let body = `StrCustomerid=C000001&DatDueDate=2020-04-17&IntSiteID=1&intTankID=1&strItem=diesel&dblordqty=25&strToken=E2874E81-15D3-4E69-9710-7B079DCF2C94`;
    // console.log('body => ', body);
    // this.service.post('CreateOrder', body).subscribe(res => {
    //   console.log('res ========> ', res);
    //   const data = this.commonService.XMLtoJson(res);
    //   console.log('data => ', data);
    // }, (err) => {
    //   console.log('err => ', err);
    // });


    if (flag) {

    }
  }

}

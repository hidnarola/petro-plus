import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CrudService,
    private commonService: CommonService,
    private router: Router
  ) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      password: ['']
      // password: ['', Validators.required]
    });
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
  }

  onSubmit(flag) {
    console.log('flag => ', flag);
    console.log('this.form.value => ', this.form.value);
    if (flag) {
      const body = `StrCustomer=${this.form.value.userName}`;
      // let body = `username=${username}&password=${password}`;
      console.log('body => ', body);
      this.service.post('VerifyAccount', body).subscribe(res => {
        console.log('res ========> ', res);
        let data = this.commonService.XMLtoJson(res);
        console.log('type of ==> data.verifyAccountResponse => ', typeof data.verifyAccountResponse);
        console.log('data.verifyAccountResponse => ', data.verifyAccountResponse);
        // console.log('JSON.parse(data.verifyAccountResponse) => ', JSON.parse(data.verifyAccountResponse));
        localStorage.setItem('userData', JSON.stringify(data.verifyAccountResponse));
        this.router.navigate(['/sites']);
      }, (err) => {
        console.log('err => ', err);
      });
    }
    this.isSubmitted = true;
  }
}

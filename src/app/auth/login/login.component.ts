import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpHeaders } from '@angular/common/http';
import { CommonService } from 'src/app/shared/common.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService
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
        const data = this.commonService.XMLtoJson(res);
        console.log('data : Login Response => ', data);
        if (data.verifyAccountResponse.CustomerID._text) {
          localStorage.setItem('userData', JSON.stringify(data.verifyAccountResponse));
          this.toastr.success('Logged in successfully!');
          this.router.navigate(['/sites']);
        } else {
          this.toastr.error('Error occurred, Please try again later!');
        }
      }, (err) => {
        console.log('err => ', err);
      });
    }
    this.isSubmitted = true;
  }
}

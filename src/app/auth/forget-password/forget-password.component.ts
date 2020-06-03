import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
  }

  onSubmit(flag) {
    this.isSubmitted = true;
  }

}

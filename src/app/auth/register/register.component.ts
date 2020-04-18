import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
  }

  onSubmit(flag) {
    console.log('flag => ', flag);
    this.isSubmitted = true;
  }
}

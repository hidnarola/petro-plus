import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {

  visibleSidebar1;
  visibleSidebar2;
  openEditForm = false;
  form: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      firstName: ['Name', Validators.required],
      lastName: ['Name', Validators.required],
      phoneNumber: ['+91 (2541) 201-850', Validators.required],
      email: ['user@support.com', Validators.required],
      password: ['password', Validators.required]
    });
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
  }

  closeEditProfile() {
    this.visibleSidebar1 = false;
    setTimeout(() => {
      this.openEditForm = false;
    }, 1000);
  }

  onSubmit(flag) {
    console.log('flag => ', flag);
    this.isSubmitted = true;
    console.log('formControls => ', this.formControls);
  }

}

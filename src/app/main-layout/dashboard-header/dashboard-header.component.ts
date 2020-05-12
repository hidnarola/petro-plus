import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  currentURL;
  mapView: boolean;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private route: Router
  ) {
    console.log('this.route.url => ', this.route.url);
    console.log('this.activateRoute.snapshot => ', this.activateRoute.snapshot);
    this.currentURL = this.route.url;
    console.log('this.currentURL => ', this.currentURL);
    if (this.currentURL === '/sites/map') {
      this.mapView = true;
    } else {
      this.mapView = false;
    }
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

  closeNavbar() {
    this.visibleSidebar1 = false;
    this.mapView = false;
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

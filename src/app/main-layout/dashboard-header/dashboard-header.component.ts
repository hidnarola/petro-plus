import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from 'src/app/shared/data-share.service';

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
    private router: Router,
    private dataShareService: DataShareService
  ) {
    console.log('this.router.url => ', this.router.url);
    console.log('this.activateRoute.snapshot => ', this.activateRoute.snapshot);
    this.currentURL = this.router.url;
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

  // switch between map view and list view for site Listing
  switchView() {
    this.router.navigate(['/sites']);
    this.mapView = false;
  }

  // Manage Bottom sheet content
  manageBottomSheet() {
    this.dataShareService.setBottomSheet({ step: 0, targetComponent: 'mapOptions' });
  }

  // Close navbar and set default view for site listing page
  closeNavbar() {
    this.visibleSidebar1 = false;
    this.mapView = false;
  }

  // close icon on edit profile
  closeEditProfile() {
    this.visibleSidebar1 = false;
    setTimeout(() => {
      this.openEditForm = false;
    }, 1000);
  }

  // On submit of edit profile
  onSubmit(flag) {
    console.log('flag => ', flag);
    this.isSubmitted = true;
    console.log('formControls => ', this.formControls);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataShareService } from 'src/app/shared/data-share.service';
import { ToastrService } from 'ngx-toastr';

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
  userData: any;

  constructor(
    private fb: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private dataShareService: DataShareService,
    private toastr: ToastrService
  ) {
    this.currentURL = this.router.url;
    if (this.currentURL === '/sites/map') {
      this.mapView = true;
    } else {
      this.mapView = false;
    }
    this.userData = JSON.parse(localStorage.getItem('userData'));

    this.dataShareService.manageHeaderDetail.subscribe(res => {
      if (res) {
        if (res.mapView) {
          this.mapView = true;
        } else {
          this.mapView = false;
        }
      }
    });

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
    this.dataShareService.manageCurrentLocationIcon({ currentLocationIcon: false });
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
    this.dataShareService.setMarkedSiteDetail({ isMarked: false });
  }

  // Manage Bottom sheet content
  manageBottomSheet() {
    this.dataShareService.setBottomSheet({ step: 0, targetComponent: 'mapOptions' });
    this.dataShareService.manageCurrentLocationIcon({ currentLocationIcon: false });
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
    this.isSubmitted = true;
  }

  // Logout
  logout() {
    this.visibleSidebar1 = false;
    this.router.navigate(['']);
    localStorage.removeItem('userData');
    this.dataShareService.setBottomSheet({});
    // this.toastr.success('Logged out successfully!');
  }

}

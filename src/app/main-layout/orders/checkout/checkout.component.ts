import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataShareService } from 'src/app/shared/data-share.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  form: FormGroup;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private dataShareService: DataShareService
  ) {
    this.form = this.fb.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      cardDate: ['', Validators.required],
      cvc: ['', Validators.required]
    });
  }

  get formControls() { return this.form.controls; }

  ngOnInit(): void {
  }

  closePopup() {
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
  }

  onSubmit(flag) {
    this.isSubmitted = true;
    this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
    this.dataShareService.setOrderData([]);

    // if (flag) {
    //   this.dataShareService.setBottomSheet({ step: 1, targetComponent: 'initial' });
    // }
  }

}

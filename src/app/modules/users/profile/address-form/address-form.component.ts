import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService, UserService } from '../../../../shared/services';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {


  AddressForm: FormGroup;
  updateAddress= false;
  addressContent ='New Address'
  addressList: any;

  constructor(
  private formBuilder: FormBuilder,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private userService: UserService,
  private snackbarService: SnackbarService,
  public dialogRef: MatDialogRef<AddressFormComponent>
  ) { }

  ngOnInit(): void {
    this.AddressForm = this.formBuilder.group({
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      id: ['', []],
      state: ['', [Validators.required]],
      street: ['', [Validators.required]],
      postal_code: ['', [Validators.required]],
      is_primary_address: [false, [Validators.required]],
    });

    if (this.data.Address !='blank'){
      this.addressContent ='Update Address'
      this.updateAddress = true;

      this.AddressForm.patchValue({
        city: this.data.Address.city,
        country: this.data.Address.country,
        id: this.data.Address.id,
        state: this.data.Address.state,
        street: this.data.Address.street,
        postal_code: this.data.Address.postal_code,
        is_primary_address: this.data.Address.is_primary_address,
      });
    }
  }


  saveAddressInfo(){

    if (this.updateAddress){
      this.userService.updateUserAddress(this.AddressForm.value).subscribe((data: any) => {
        this.userService.getUserAddressList().subscribe((data: any) => {
          this.addressList = data;

        });
        this.snackbarService.open('Address updated successfully.', 'success');
      }, error => {
        this.snackbarService.open(error.error.detail, 'danger');
      });

    }else{
      delete this.AddressForm.value.id;
      this.userService.createUserAddress(this.AddressForm.value).subscribe(data => {
        this.snackbarService.open('Address added successfully.', 'success');
      }, error => {
        this.snackbarService.open(error.error.postal_code, 'danger');
      });
    }
    this.dialogRef.close(true);
  }

}

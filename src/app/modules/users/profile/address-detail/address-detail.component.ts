import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from '../../../../shared/components/confirm-delete/confirm-delete.component';
import { SnackbarService, UserService } from '../../../../shared/services';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  addressList: any;

  constructor(private userService: UserService,
              public dialog: MatDialog,
              private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.getAddressList();
  }
  getAddressList() {
    this.userService.getUserAddressList().subscribe((data: any) => {
      this.addressList = data;

    });
  }
  showAddressForm(editAddress): void {

    const dialogRef = this.dialog.open(AddressFormComponent, {
      data: {
        Address: editAddress
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.getAddressList();
    });
  }
  openDeleteDialog(id){
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe(result => {


      if (result){
        this.deleteAddress(id);
      }
    });
  }
  private deleteAddress(id) {


    this.userService.deleteAddress(id).subscribe(data => {
      this.getAddressList();
      this.snackbarService.open('Address deleted successfully.', 'success');
    }, error => {
      this.snackbarService.open(error.error.detail, 'danger');
    });
  }
}

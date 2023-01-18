import { AddressFormComponent } from './../../profile/address-form/address-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressService } from '../../../../shared/services';

@Component({
  selector: 'app-address-dropdown',
  templateUrl: './address-dropdown.component.html',
  styleUrls: ['./address-dropdown.component.scss']
})
export class AddressDropdownComponent implements OnInit {
  defaultAddress
  list:any[]=[]
  previousDefaultAdd=null
  @Output() selectionChange=new EventEmitter()
  constructor(
    private addressService: AddressService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAddress()
  }

  addAddress(){
    let dialogRef = this.dialog.open(AddressFormComponent, {
      data: {
        Address: 'blank'
      }
    })
    dialogRef.afterClosed().subscribe(result => {


      if (result){
        this.getAddress();
      }
    });
  }
  onSelectionChange(event){
    this.defaultAddress=event.value
    this.emit(event.value)
  }
  private emit(value){
    this.selectionChange.emit(value)
  }
  getDisplayValue(item){
    return `${item.street} ${item.city} ${item.state} ${item.country} ${item.postal_code}`
  }
   //Get Address List
   getAddress() {
     this.addressService.getAll().subscribe((data:any)=>{


       if(data){
        this.list = data
        for(let element of data){
          if(element.is_primary_address){
            this.defaultAddress = element
            this.previousDefaultAdd = element
            this.emit(this.defaultAddress)
            break;
          }

        }
       }

     })

   }



}

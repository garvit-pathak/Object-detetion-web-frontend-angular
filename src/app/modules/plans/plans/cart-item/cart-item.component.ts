import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { CartItem } from '../../../../shared/models/cart.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() plan: CartItem
  constructor(

  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {


  }
  onDateChange(event){
    
  }
}

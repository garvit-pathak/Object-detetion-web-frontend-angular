import { Overlay } from '@angular/cdk/overlay';
import { ActivatedRoute } from '@angular/router';
import { GoToCartComponent } from './../go-to-cart/go-to-cart.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '../../../../shared/models/cart.model';
import { SubscriptionPlanService } from '../../../../shared/services';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  planList: any[];
  cart: ShoppingCart = new ShoppingCart();

  basePlanAdded = false;
  dialogRef = null;
  accessCode = null;
  constructor(
    private subscriptionService: SubscriptionPlanService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private overlay: Overlay

  ) { }

  ngOnInit(): void {
    this.accessCode = this.route.snapshot.queryParams.accessCode;

    this.getAll();
  }

  openDialog(){
   this.dialogRef = this.dialog.open(GoToCartComponent, {
      position: {
        top: '64px',
        right: '0px'
      },
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop()
    });
  }

  closeDialog(){
    this.dialogRef.close();
    this.dialogRef = null;
  }

  removeFromCart(event){
    this.cart.removeFromCart(event);
    if (!this.cart.totalItem){
      this.closeDialog();
    }
    this.setCartToService();
  }
  addToCart(product) {


    this.cart.addToCart(product);
    if (!this.dialogRef){
    this.openDialog();
    }
    this.setCartToService();

  }
  isPlanActivate(plan) {
    return plan.slug === 'mid-level-plan' ? true : false;
  }
  onSelectedGroup(event){


    this.cart.group = event;
    this.setCartToService();
  }
  setCartToService(){
    this.subscriptionService.setCartData(this.cart);
  }
  getAll() {
    this.subscriptionService.getPlans().subscribe((data: any) => {

      this.planList = data;
    });
  }



}

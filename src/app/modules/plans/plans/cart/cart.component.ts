import { PaymentSuccessComponent } from './../payment-success/payment-success.component';
import { MatDialog } from '@angular/material/dialog';
import { browserRefresh } from './../../../../app.component';
import { environment } from './../../../../../environments/environment';
import { SubscriptionPlanService } from './../../../../shared/services/subscription-plan.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ShoppingCart, User } from '../../../../shared/models';
import { PaymentService, SnackbarService, UserService } from '../../../../shared/services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  WindowRef: any;
  processingPayment: boolean;
  paymentResponse: any = {};
  minDate = new Date();
  currentUser: User;
  cart: ShoppingCart;
  lastPlanActiveDate;
  loadItem = false;

  dateRetrieved = false;


  selectedFinalPlans: any[] = [];
  subscriptionPlansJson;
  accessCode: string = null;
  isDisabled = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionPlanService: SubscriptionPlanService,
    private paymentService: PaymentService,
    private changeRef: ChangeDetectorRef,
    private snackbar: SnackbarService,
    private userService: UserService,
    private ngZone: NgZone,
    private dialog: MatDialog,


  ) {
    this.WindowRef = paymentService.WindowRef;
  }

  ngOnInit(): void {
    this.accessCode = this.route.snapshot.queryParams.accessCode;
    if (browserRefresh){

      this.goToPlans();
    }
    else{
      this.getUser();

      this.subscriptionPlanService.cartData
      .subscribe((cart: ShoppingCart) => {


        this.cart = cart;
        if (!this.dateRetrieved && this.cart){
        this.getLastBasePlanDate();

        }
      });
    }
  }
  goToPlans(){
    if (this.accessCode){
    this.router.navigate(['/plans/pricing'], {queryParams: {accessCode: this.accessCode}});
    return;
    }
    this.router.navigate(['/plans/pricing']);
  }
  openPaymentSuccess(){
    this.dialog.open(PaymentSuccessComponent, {
      disableClose: true
    });

  }
  getUser(){
    this.userService.currentUser.subscribe((data: User) => {
      this.currentUser = data;
    });
  }
  maxDate(plan) {
    if (plan.plan.plan_type === 'BP') {
      return this.lastPlanActiveDate;
    }
  }
  btnVisible(plan) {
    return plan.plan.plan_type === 'BP' ? false : true;
  }
  getLastBasePlanDate() {
    this.subscriptionPlanService.getLastBasePlanEffectiveUptoDate(this.cart.group).subscribe((data: any) => {

      if (!data['effective_upto']) {


        this.lastPlanActiveDate = new Date();
      }
      else {

        this.lastPlanActiveDate = new Date(data['effective_upto']);
      }


      this.cart.setEffectiveFrom(this.lastPlanActiveDate);
      this.loadItem = true;
      this.subscriptionPlanService.setCartData(this.cart);
      this.dateRetrieved = true;
    });
  }

  onSAddressSelection(event) {


    if (!this.cart){


      setTimeout(() => {
        this.cart.addressId = event.id;
        this.subscriptionPlanService.setCartData(this.cart);
      }, 3000);
    }
    else{
      this.cart.addressId = event.id;
      this.subscriptionPlanService.setCartData(this.cart);
    }

  }
  // Proceed to Pay Method
  proceedToPay(event) {
    this.isDisabled = true;
    this.processingPayment = true;
    this.selectedFinalPlans = [];
    this.cart.plans.forEach(plan => {
      if (plan.plan.plan_type === 'BP') {

      }
      this.selectedFinalPlans.push({
        plan_id: plan.plan.id,
        effective_from: plan.effectiveFrom,
        quantity: plan.quantity,
      });

    });

    this.subscriptionPlansJson = { 'address': this.cart.addressId, 'group': +this.cart.group, 'plans': this.selectedFinalPlans };
    this.initiatePaymentModal(event);

  }


  initiatePaymentModal(event) {
    this.paymentService.createOrder(this.cart.group, this.subscriptionPlansJson)
      .subscribe(order => {
        console.log(order);

        let rzp1 = new this.WindowRef.Razorpay(this.preparePaymentDetails(order));
        this.processingPayment = false;
        rzp1.open();
        event.preventDefault();
      }, error => {
        console.log(error);

        this.isDisabled = false;

      });
  }


  preparePaymentDetails(order) {
    let ref = this;
    return {
      'key': environment.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      'amount': order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 29935 refers to 29935 paise or INR 299.35.
      'name': 'Xtract',
      'currency': order.currency,
      'order_id': order.id, // This is a sample Order ID. Create an Order using Orders API. (https://razorpay.com/docs/payment-gateway/orders/integration/#step-1-create-an-order). Refer the Checkout form table given below
      'image': 'https://angular.io/assets/images/logos/angular/angular.png',
      'handler': (response) => {
        ref.handlePayment(response, order);
      },
      // callback_url: () =>{
      //   this.ngZone.run(() => this.router.navigate(['dashboard']))

      // },
  // redirect: true,
      'prefill': {
        'name': this.currentUser ? this.currentUser.getName() : '',
        'email': this.currentUser ? this.currentUser.email : '',
        'contact': this.currentUser ? this.currentUser.phone_number : '',
      },
      'theme': {
        'color': '#2874f0'
      },

      modal: {
        // We should prevent closing of the form when esc key is pressed.
        ondismiss: () => { // <- Here!
          // alert('dismissed')
          this.ngZone.run(() => this.isDisabled = false);
        },
        escape: false,
      },
    };
  }

  handlePayment(response, order) {
    response.plans = this.subscriptionPlansJson;
    this.paymentService.capturePayment(this.cart.group, response)
      .subscribe(res => {
        this.subscriptionPlanService.setCartData(null);
          this.changeRef.detectChanges();
        this.ngZone.run(() => this.openPaymentSuccess());


      },
        error => {

          this.snackbar.open(`${error}`, 'danger', '', { horizontalPosition: 'center' });
          this.isDisabled = false;
        });
  }


}

import { MatDialogRef } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SubscriptionPlanService } from '../../../../shared/services';

@Component({
  selector: 'app-go-to-cart',
  templateUrl: './go-to-cart.component.html',
  styleUrls: ['./go-to-cart.component.scss']
})
export class GoToCartComponent implements OnInit {
  accessCode = null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<GoToCartComponent>,
  ) { }

  ngOnInit(): void {
    this.accessCode = this.route.snapshot.queryParams.accessCode;

  }

  goToCart(){
    if (this.accessCode){

    this.router.navigate(['/plans/cart'], {queryParams: {accessCode: this.accessCode}});
    this.close();
    return;
    }
    this.router.navigate(['/plans/cart']);
    this.close();
    }


    close(){
    this.dialogRef.close();

    }
}

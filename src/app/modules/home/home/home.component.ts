import { Component, OnInit } from '@angular/core';
import {   SubscriptionPlanService } from '../../../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  plans$;
  constructor(
    private planService: SubscriptionPlanService
  ) { }

  ngOnInit(): void {
    this.getPlans()
  }

  getPlans(){
    this.plans$= this.planService.getPlans()
  }

}

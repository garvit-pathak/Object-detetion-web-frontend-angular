import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCart } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionPlanService {

  private _cartData: BehaviorSubject<ShoppingCart> = new BehaviorSubject<ShoppingCart>(null)
  constructor(
    private http: HttpClient
  ) { }


  public get cartData() : Observable<ShoppingCart> {
    return this._cartData.asObservable()
  }
  setCartData(cart:ShoppingCart){
    this._cartData.next(cart)
  }

  getPlans(){
    return this.http.get(`${environment.apiUrl}/plans`)
  }
  getLastBasePlanEffectiveUptoDate(groupID) {

    return this.http.get<any>(`${environment.apiUrl}/date/?group_id=${groupID}`);
  }

  getCurrentPlan(groupID) {
    return this.http.get<any>(`${environment.apiUrl}/current-plan/?group_id=${groupID}`);
  }

  getCurrenBasePlan(groupID) {
    return this.http.get<any>(`${environment.apiUrl}/current-baseplan/?group_id=${groupID}`);
  }


  createOrder(groupID, orderDetails) {
    return this.http.post<any[]>(`${environment.apiUrl}/create-order/${groupID}`, orderDetails)
  }

  oldPlanList(groupID,limit,offset){
    return this.http.get<any>(`${environment.apiUrl}/old-plans/${groupID}?limit=${limit}&offset=${offset}` );
  }


}

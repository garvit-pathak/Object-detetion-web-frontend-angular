import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  get WindowRef() {
    return window;
  }

  createOrder(groupId,orderDetails) {

    return this.http.post(environment.apiUrl + '/create-order/'+groupId, orderDetails);
  }

  capturePayment(groupId,paymemntDetails) {
    return this.http.post(environment.apiUrl + '/capture-payment/'+groupId,paymemntDetails);
}
}

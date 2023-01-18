import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor( private http: HttpClient, ) { }

  getAllTicketDetail(limit: number = 100, offset: number = 0){
    return this.http.get(`${environment.apiUrl}/create-ticket?limit=${limit}&offset=${offset}`)
  }

  create(data){
    return this.http.post(`${environment.apiUrl}/create-ticket/`,data)
  }
}

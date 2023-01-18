import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  constructor(
    private http:HttpClient
  ) { }

  getReading(type,data){
    let url = `${environment.apiUrl}/meter_reading/?choice=${type}`

    return this.http.post(url,data)
  }

}

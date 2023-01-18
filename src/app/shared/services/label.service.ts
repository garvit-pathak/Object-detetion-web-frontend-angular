import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LabelService {

  constructor(
    private http: HttpClient
  ) { }
  create(labeData){
    return this.http.post(`${environment.apiUrl}/labels/`, labeData);
  }

  getLabelAndCoordinates(pid, mid){ //data for graph
    return this.http.get<any>(`${environment.apiUrl}/projects/${pid}/models/${mid}/tags-details`);
  }
  delete(id){
    return this.http.delete(`${environment.apiUrl}/labels/${id}`);
  }
}

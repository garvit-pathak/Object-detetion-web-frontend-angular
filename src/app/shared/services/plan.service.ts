import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private url: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getCurrenBasePlan(groupID) {
    return this.http.get<any>(this.url + '/current-baseplan/?group_id=' + groupID);
  }
}

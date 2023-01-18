import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http:HttpClient
  ) { }

  getAllGroupList(){
    return this.http.get<any[]>(`${environment.apiUrl}/users/grouplist`);
  }
  getAllGroupWithUsers(){
    return this.http.get<any[]>(`${environment.apiUrl}/users/dashboard/groups`);
  }
}

import { tap } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(null);
  currentUser: Observable<User>;
  constructor(
    private http: HttpClient,
  ) {
    this.currentUser = this.currentUserSubject.asObservable();
  }



  private getUserData(): void{
    this.http.get(`${environment.apiUrl}/users/profile/`)
    .pipe(tap((user) => {

      const  p = new User().deserialize(user);

      this.storeUser(p);
    })).toPromise();
  }



  //// project related APIS
  getProjectTeam(projectId:number){
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/userproject/`)
  }
  crerateUsersInProject(projectId,user): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/projects/${projectId}/userproject/`,user);
  }
  removeFromProject(projectId:number,userId:number){
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/userproject/` + userId)
  }
  updateUserInProject(projectId:number,user:any){
    return this.http.put(`${environment.apiUrl}/projects/${projectId}/userproject/${user.id}/`,user)

  }






  ///Group related api
  getAllUsersOfGroup(groupId){
    return this.http.get(`${environment.apiUrl}/group/?group_id=${groupId}`);
  }
  getSearchUserList(groupId, pattern) {

    return this.http.get(`${environment.apiUrl}/users/regexp/?group_id=${groupId}&pattern=${pattern}`)
  }

  getAllRoles() {
    return this.http.get(`${environment.apiUrl}/roles`);
  }

  addUserToGroup(groupId, data): Observable<any> {

    return this.http.post<any>(`${environment.apiUrl}/group/?group_id=${groupId}`, data);
  }
  deleteUserFromGroup(groupId) {
    return this.http.delete(`${environment.apiUrl}/group/${groupId}`);
  }
  updateUserRole(group) {
    return this.http.put(`${environment.apiUrl}/group/${group.id}`, group);
  }
  setUser(forceUpdate= false): void{
    const p = this.getUser();

    if (!p || forceUpdate){
      this.getUserData();
    }
    else {
      this.setUserFromStorage();
      }
  }
  removeUser(){
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
  setUserFromStorage(): void{
    const p: User = this.getUser();
    if (p){
      this.currentUserSubject.next(p);
    }
  }
  private getUser(): User{
    const p =  localStorage.getItem('user');
    if (p){
     return new User().deserialize(JSON.parse(p));
    }
    return null ;
  }
  private storeUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Update User Profile
  updateUserProfile(user) {

    return this.http.patch(`${environment.apiUrl}/users/profile/`, user);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiUrl}/users/profile/`);
  }

  // Address Methods
  getUserAddressList() {
    return this.http.get(`${environment.apiUrl}/users/address/`);

  }

  createUserAddress(address){
    return this.http.post(`${environment.apiUrl}/users/address/`,address)
  }

  updateUserAddress(address) {
    return this.http.put(`${environment.apiUrl}/users/address/` + address.id, address);
  }

  deleteAddress(id){
    return this.http.delete(`${environment.apiUrl}/users/address/`+id)
  }

  // Password Methods
  changePassword(data){
    return this.http.post(`${environment.apiUrl}/users/password` ,data)
  }

  createQuery(data){
    return this.http.post(`${environment.apiUrl}/user-query`,data)
  }
  getUserCount(){
    return this.http.get(`${environment.apiUrl}/users/count`)
  }
}

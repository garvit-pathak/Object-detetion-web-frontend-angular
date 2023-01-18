import {  map,tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  private currentProjectSubject = new BehaviorSubject<Project>(null);
  currentProject: Observable<Project>;
  constructor(
    private http: HttpClient
  ) {

    this.currentProject = this.currentProjectSubject.asObservable();


   }

   getListByGroupId(groupId){
    return this.http.get(`${environment.apiUrl}/projects/?group_id=${groupId}`);
   }

   create(groupId,data){
     
    return this.http.post(`${environment.apiUrl}/projects/?group_id=${groupId}`, data);
   }
   update(project: any) {

    return this.http.put(`${environment.apiUrl}/projects/${project.id}/`, project);
  }
  delete(projectId:number){
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}`)
  }

  getProjectFromServer(projectId: number): Observable<Project>{
    return this.http.get(`${environment.apiUrl}/projects/${projectId}`)
    .pipe(map((project) => {
      const m = new Project().deserialize(project);
      return m;
    }))
  }

  private getProjectById(id){
    this.http.get(`${environment.apiUrl}/projects/${id}`)
    .pipe(tap((project) => {
      let  p =new Project().deserialize(project)

      this.storeProject(p);
    })).toPromise();
  }

  removeProject(): void{
    if(this.getProject()){
      sessionStorage.removeItem('project');
    this.currentProjectSubject.next(null);
    }
  }


  setProjectFromStorage(): void{
    let p: Project = this.getProject()
    if(p){
      this.currentProjectSubject.next(p)
    }
  }


  setProject(projectId,forceUpdate=false): void{
    const p = this.getProject();

    if (!p || (p.project_id !== projectId) || forceUpdate){
      this.getProjectById(projectId);
    }
    else if(p && (p.project_id === projectId)){
        this.setProjectFromStorage()
      }
  }

  private storeProject(project: Project): void {
    sessionStorage.setItem('project', JSON.stringify(project));
    this.currentProjectSubject.next(project);
  }

  private getProject(): Project{
    let p=  sessionStorage.getItem('project');
    if(p){
      return new Project().deserialize(JSON.parse(p))
    }
    return  null ;

  }
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/projects/' + 'project-list');
  }

  getIsSequential(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiUrl + '/projects/seq-project/');
  }
}

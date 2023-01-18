import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Model } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private currentModelSubject = new BehaviorSubject<Model>(null);
  currentModel: Observable<Model>;
  constructor(
    private http: HttpClient,
  ) {
    this.currentModel = this.currentModelSubject.asObservable();
    // console.log('model service',this.currentModel);
    // console.log('model subject', this.currentModelSubject);
    
    
  }

  getAllByProjectId(projectId, limit= '', offset= ''){
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/`);
  }

  create(projectId: number, model: Model) {
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/models/`, model);
  }
  update(projectId: number, model: Model) {
    return this.http.put(`${environment.apiUrl}/projects/${projectId}/models/${model.id }/`, model);
  }

  delete(projectId: number, modelId: number) {
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/`);
  }

  getModelListByGroup(groupId){
    return this.http.get(`${environment.apiUrl}/${groupId}/models`)
  }

  //method for storing and using model inn storage


  getModelFromServer(projectId: number, modelId: number): Observable<Model>{
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}`)
    .pipe(map((model) => {
      const m = new Model().deserialize(model);

      return m;
    }))
  }

  private getModelById(projectId: number, modelId: number){
    this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}`)
    .pipe(tap((model) => {
      const m = new Model().deserialize(model);


      this.storeModel(m);
    })).toPromise();
  }

  removeModel(): void{
    if (this.getModel()){
      sessionStorage.removeItem('model');
      this.currentModelSubject.next(null);
    }
  }


  private setModelFromStorage(): void{
    const p = this.getModel();
    if (p){
      this.currentModelSubject.next(p);
    }
  }


  setModel(projectId: number,modelId: number, forceUpdate= false): void{

    const model = this.getModel();

    if (!model || (model.id !== modelId) || forceUpdate){


      this.getModelById(projectId,modelId);
    }
    else if (model && (model.id === modelId)){

        this.setModelFromStorage();
      }


  }

  private storeModel(model: Model): void {
    sessionStorage.setItem('model', JSON.stringify(model));
    this.currentModelSubject.next(model);
  }

  private getModel(): Model{
    const p =  sessionStorage.getItem('model');
    if (p){
      return new Model().deserialize(JSON.parse(p));
    }
    return null;
  }


}

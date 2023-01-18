import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  constructor(private http: HttpClient) { }

  showTrainingStatus(limit: number = 100,offset: number = 0){
    return this.http.get(`${environment.apiUrl}/users/dashboard/trainingprocess?limit=${limit}&offset=${offset}`);
  }

  showProductionStatus(limit: number = 100,offset: number = 0){
    return this.http.get(`${environment.apiUrl}/users/dashboard/productionprocess?fields=web&limit=${limit}&offset=${offset}`);

  }

  startTraining(projectId:number,modelId:number,fromScratch:boolean){
    let data =  fromScratch ? {model: modelId,scratch : 1, } : {model: modelId};
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/start-training/`,data);
  }
  stopTraining(projectId:number,modelId:number){
    const data = {
      model: modelId
    };
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/stop-training`,data);
  }
  getLoss(projectId,modelId){
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/loss`);
  }


}

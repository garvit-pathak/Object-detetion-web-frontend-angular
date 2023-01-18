import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  constructor(private http: HttpClient) { }

  getProcessCount(isDashboard: boolean, projectId: number= -1) {
    if (!isDashboard && projectId === -1){
      throw new TypeError('project id required')
    }
    if (isDashboard){
      return this.http.get<any>(`${environment.apiUrl}/users/process_count/`);

    }
    return this.http.get<any>(`${environment.apiUrl}/users/process_count/?project_id=${projectId}`);

  }
  getAllProductionImage(projectId: number, modelId: number, limit, offset): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/images-by-model/?limit=${limit}&offset=${offset}`);
  }
  updateFeedback(projectId: number, modelId: number, image) {
    return this.http.put(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production-image/${image.id}`, image);
  }

  getAll(projectId: number, modelId: number, limit: number, offset: number, ordering: string = ''){
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/processes/?fields=web&limit=${limit}&offset=${offset}&ordering=${ordering}`)
  }
  getFilterImage(projectId: number, modelId: number, limit, offset, label): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/images-by-model/${label}/?limit=${limit}&offset=${offset}`)
  }
  getProcessImageById(projectId: number, modelId: number, processId, limit, offset){
    return this.http.get<any[]>(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/process/${processId}/images/?limit=${limit}&offset=${offset}`)
  }
  deleteProductionProcess(projectId: number, modelId: number, processId){
    return this.http.delete(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/process/${processId}/`);
  }
  create(projectId: number, modelId: number, name: string, images: File[], check: boolean){
    let formData = new FormData()
    images.forEach(element => {
      formData.append('images', element);
    });
    formData.append('name', name);
    formData.append('data', JSON.stringify({ check: check }));
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/processes/`, formData)
  }

  inference(projectId: number, modelId: number, name: string, images: File[]){
    const formData = new FormData()
    images.forEach(element => {
      formData.append('name', element);
    });
    formData.append('process', name);
    return this.http.post(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/sequence-inference/`, formData)    
  }



  getimagesbysequentialmodel(projectId: number, modelId: number, limit): Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/limit/${limit}/images-by-sequence-model`);
  }


  update(projectId: number, modelId: number, processId: any, data: any){
    return this.http.patch(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/production/processes/${processId}/?fields=web`, data)
  }

  getModelStatusPipeLine(projectId: number){
    return this.http.get(`${environment.apiUrl}/users/process_count/meter/?project_id=${projectId}`);
  }
}

import { Observable, Subject } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImageType } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private _doesImageTagged = new Subject()
  constructor(
    private http: HttpClient,
  ) { }


  public set doesImageTagged(v : boolean) {
    this._doesImageTagged.next(v);
  }

  getDoesImageTagged(){
    return this._doesImageTagged.asObservable();
  }



  // All project images urls

  getProjectImageList(projectId, limit: number = 100, offset: number = 0) {
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/images?limit=${limit}&offset=${offset}`);
  }

  deleteProjectImages(pid, images) {
    return this.http.post(`${environment.apiUrl}/projects/${pid}/delete-images`, images);
  }

  //image selection Service
  getAllByProjectId(projectId: number, modelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/excluded-images`)
  }

  uploadProjectImages(projectId,files: File[]): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    files.forEach(element => {
      formData.append('name', element);
    });


    const req = new HttpRequest('POST', `${environment.apiUrl}/projects/${projectId}/upload-images/`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  //image selection Service
  setImageToModel(projectId: number, array){

    return this.http.post<any[]>(`${environment.apiUrl}/projects/${projectId}/moveimages/`, array)
  }

  // All model images urls

  getModelImages(projectId: number, modelId: number, limit: number = 100, offset: number = 0, fullList = false) {
    if (fullList) {
      return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/images`);
    }
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/images?limit=${limit}&offset=${offset}`);
  }



  // all tagging related api

  getImageForTagging(projectId: number, modelId: number, imageId: number, imageType: ImageType) {

    switch (imageType) {
      case ImageType.TRAINING:
        return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/taggingimages/${imageId}/tags`);
      case ImageType.FEEDBACK:
        return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/feedback/${imageId}`);
        case ImageType.TASK:
          return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/taggingimages/${imageId}/tags`);
    }
  }
  saveTaggedImage(projectId: number, modelId: number, imageId: number, imageType: ImageType, data): Observable<Object> {

    if (imageType === ImageType.TRAINING || imageType === ImageType.TASK) {


      return this.http.patch(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/taggingimages/${imageId}/tags`, data);
    }
    else {


      return this.http.patch(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/feedback/${imageId}`, data);
    }
  }
  // All feedback images urls

  getAllFeedbackImages(projectId: number, modelId: number,limit:number=null) {
    if(!limit){
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/feedback/`);

    }
    return this.http.get(`${environment.apiUrl}/projects/${projectId}/models/${modelId}/feedback/?limit=${limit}`);

  }


  // All task images urls


  // All other images urls

}

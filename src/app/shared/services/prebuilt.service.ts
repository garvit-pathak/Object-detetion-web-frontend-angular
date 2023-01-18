import { tap, map } from 'rxjs/operators';
import { Model } from './../models/model.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const clone = (obj) => Object.assign({}, obj);
const renameKey = (object, key, newKey) => {

  const clonedObj = clone(object);

  const targetKey = clonedObj[key];



  delete clonedObj[key];

  clonedObj[newKey] = targetKey;

  return clonedObj;

};


@Injectable({
  providedIn: 'root'
})
export class PrebuiltService {

  constructor(
    private http:HttpClient,
  ) { }

  getList(){
  return this.http.get(`${environment.apiUrl}/publicmodels`)
  }
  uploadImages(modelId,files: File[]){
    let fd = new FormData();

    files.forEach(element => {
      fd.append("name", element);
    });
    fd.append("model", modelId);
    return this.http.post(`${environment.apiUrl}/publicimages/`,fd)
  }

  getModelById(id:number): Observable<Model>{
    return this.http.get(`${environment.apiUrl}/publicmodels/${id}`).pipe(
      map((model) =>{
        model = renameKey(model, 'public_labels', 'labels');
        return new Model().deserialize(model);
      })
    )

  }
}

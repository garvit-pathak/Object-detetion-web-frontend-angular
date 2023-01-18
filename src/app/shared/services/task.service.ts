import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient,) { }

  create(groupId,data){
    return this.http.post(`${environment.apiUrl}/group/assign-task/?group_id=${groupId}`,data)
  }
  getAssignedTaskList(groupId, limit = null, offset = null){
    return this.http.get(`${environment.apiUrl}/group/assign-task/?group_id=${groupId}&limit=${limit}&offset=${offset}`)
  }
  delete(taskId) {
    return this.http.delete(`${environment.apiUrl}/task/${taskId}`)
  }
  getAllTaskImages(taskId){
    return this.http.get(`${environment.apiUrl}/task_id/${taskId}`)
  }
}

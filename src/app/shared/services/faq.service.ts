import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface FaqConfig {
  word?:string,
  category?:string
}
const DEFAULT_FAQ_CONFIG : FaqConfig = {
  word: '',
  category: ''
}
@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(
    private http: HttpClient,
  ) { }

  getList(config: FaqConfig = {}) {
    let c = {...DEFAULT_FAQ_CONFIG, ...config}

        return this.http.get( `${environment.apiUrl}/faq/details/?search=${encodeURI(c.word)}&category=${c.category}`);
  }
  getOne(id){
    return this.http.get( `${environment.apiUrl}/faq/details/${id}`);

  }
}

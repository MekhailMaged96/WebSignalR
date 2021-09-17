
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 

  constructor(private http: HttpClient) {}

  get(url,contentType,authorization="") {
    let headers = this.setHeaders(contentType,authorization);
    return this.http.get(environment.siteurl + url,{headers:headers})
      .pipe(map(response => response));
  }

  Create(url, data,contentType,authorization="") {
    let headers = this.setHeaders(contentType,authorization);
    return this.http.post(environment.siteurl + url, data,{headers:headers})
      .pipe(map(response => response));
  }

  Update(url, data,contentType,authorization="") {
    let headers = this.setHeaders(contentType,authorization);
    return this.http.put(environment.siteurl + url, data,{headers:headers})
      .pipe(map(response => response));
  }
  Delete(url,contentType,authorization="") {
    let headers = this.setHeaders(contentType,authorization);
    return this.http.delete(environment.siteurl + url,{headers:headers})
      .pipe(map(response => response));
  }
  
  setHeaders(content,auth){
    let headers = new HttpHeaders();
    if(auth){
      headers = headers.set("Content-type",content)
                       .set("Authorization",auth);
    }
    else {
      headers = headers.set("Content-type",content)
    }
    return headers

  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiHost: any = environment.API_URL;
  public httpOptions;
  defaultHeaders: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.defaultHeaders = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      responseType: 'text'
    };
  }

  post(apiUrl, data) {
    return this.http.post(`${this.apiHost}${apiUrl}`, data, this.defaultHeaders);
  }




  get(apiUrl) {
    const url = this.apiHost + apiUrl;
    return this.http.get(url);
  }

  getParam(apiUrl, data) {
    const url = this.apiHost + apiUrl;
    let Params = new HttpParams();
    for (const key in data) {
      if (key) {
        Params = Params.append(key, data[key]);
      }
    }
    // Begin assigning parameters
    return this.http.get(url, { params: Params });
  }

  put(apiUrl, data) {
    const url = this.apiHost + apiUrl;
    return this.http.put(url, data, this.httpOptions);
  }

  postHeader(apiUrl, data) {
    const url = this.apiHost + apiUrl;
    this.httpOptions['observe'] = 'response';
    return this.http.post(url, data, this.httpOptions);
  }

  update(apiUrl, data) {
    const url = this.apiHost + apiUrl;
    return this.http.put(url, data);
  }

  delete(apiUrl) {
    const url = this.apiHost + apiUrl;
    return this.http.delete(url);
  }

  deleteParams(apiUrl, data) {
    const url = this.apiHost + apiUrl;
    let Params = new HttpParams();
    for (const key in data) {
      if (key) {
        Params = Params.append(key, data[key]);
      }
    }
    return this.http.delete(url, { params: Params });
  }

  postFormData(apiUrl, formData) {
    const url = this.apiHost + apiUrl;
    return this.http.post(url, formData);
  }

  putFormData(apiUrl, formData) {
    const url = this.apiHost + apiUrl;
    return this.http.put(url, formData);
  }

}

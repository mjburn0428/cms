import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl = 'https://jbcms-6023e-default-rtdb.firebaseio.com/'; // Replace with your Firebase URL

  constructor(private http: HttpClient) {}

  // GET request to retrieve data
  getData(endpoint: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${endpoint}.json`);
  }

  // POST request to create new data
  createData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${endpoint}.json`, data);
  }

  // PUT request to update existing data
  updateData(endpoint: string, id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}.json`, data);
  }

  // DELETE request to remove data
  deleteData(endpoint: string, id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}.json`);
  }
}

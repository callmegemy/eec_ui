import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://127.0.0.1:8000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(start: number, length: number, searchTerm: string): Observable<any> {
    const params = new HttpParams()
      .set('start', start.toString())
      .set('length', length.toString())
      .set('search[value]', searchTerm);  

    return this.http.get<any>(this.baseUrl, { params });
  }
}
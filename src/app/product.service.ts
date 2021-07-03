import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from './product';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl =
    'http://localhost:8000/api/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductResponse> {
    return this.http
      .get<ProductResponse>(this.productsUrl)
      .pipe(tap((products) => console.log('products fetched', products)));
  }
}

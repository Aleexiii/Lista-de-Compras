import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { ProductPayload } from '../interfaces/payload-product.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
  
export class ProductsService {
  
  httpClient = inject(HttpClient);
  
  getAll() { 
    return this.httpClient.get<Product[]>('/api/products')
  }
  
  post(payload: ProductPayload) {
    return this.httpClient.post('/api/products', payload)
  }

  put(id: string, payload: ProductPayload) {
    return this.httpClient.put(`/api/products/${id}`, payload)
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`/api/products/${id}`)
  }

  updateProduct(id: string, payload: Partial<ProductPayload>): Observable<any> {
    return this.httpClient.put(`/api/products/${id}`, payload)
  }
}

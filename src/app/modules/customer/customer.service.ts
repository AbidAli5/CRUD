import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerModel } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseUrl = 'http://localhost:3000/customers';
  constructor(private http: HttpClient) { }

  getAllCustomers(): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(this.baseUrl);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  updateCustomer(id: number, customer: CustomerModel): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, customer);
  }
  createCustomer(customer: CustomerModel): Observable<any> {
    return this.http.post(this.baseUrl, customer);
  }
  getCustomerById(id: number): Observable<CustomerModel> {
    return this.http.get<CustomerModel>(`${this.baseUrl}/${id}`);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, lastValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private readonly baseurl = 'api/v1/accounts';

  protected authService = this.injector.get(AuthService);

  constructor(
    private injector: Injector,
    private http: HttpClient,
  ) { }


  getCustomerBalance(customerId: string): Promise<any> {
    const url = `${this.baseurl}/balance/${customerId}`;
    const authToken = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return lastValueFrom(this.http.get<any>(url, { headers }).pipe(
      catchError(this.authService.errorHandler),
    ));
  }

  //deposit money for customer

  depositMoney(customerId: string, balance: number): Promise<any> {
    const url = `${this.baseurl}/deposit/${customerId}`;
    const authToken = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const body = { balance };
    return lastValueFrom(this.http.post<any>(url, body, { headers }).pipe(
      catchError(this.authService.errorHandler),
    ));
  }

  //withdraw money for customer
  withdrawMoney(customerId: string, balance: number): Promise<any> {
    const url = `${this.baseurl}/withdraw/${customerId}`;
    const authToken = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${authToken}` };
    const body = { balance };
    return lastValueFrom(this.http.post<any>(url, body, { headers }).pipe(
      catchError(this.authService.errorHandler),
    ));
  }


}

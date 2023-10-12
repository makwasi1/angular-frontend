import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, lastValueFrom } from 'rxjs';
import { TransactionData } from '../models/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly baseurl = 'api/v1/transactions';

  protected authService = this.injector.get(AuthService);

  constructor(
    private injector: Injector,
    private http: HttpClient,
  ) { }


  getCustomerMiniStatement(customerId: string, limit: number): Promise<TransactionData[]> {
    const url = `${this.baseurl}/mini-statement/${customerId}/${limit}`;
    const authToken = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${authToken}` };
    return lastValueFrom(this.http.get<any>(url, { headers }).pipe(
      catchError(this.authService.errorHandler),
    ));
  }
}

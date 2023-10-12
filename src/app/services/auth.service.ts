import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, throwError, lastValueFrom } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseurl = 'api/v1/auth';

  private accessToken!: string;
  private userId!: string;
  form!: FormGroup;

  constructor(
    private http: HttpClient,
  ) { }

  login(email: string, password: string) : Promise<any> {
    const credentials = { email, password };
    const url = `${this.baseurl}/signin`;
    //make post login request and return the token
    return lastValueFrom(this.http.post<any>(url, credentials).pipe(
      catchError(this.errorHandler),
    ))

    
  }

  register(name:string, customerId: string, email: string, password: string) : Promise<any> {
    const credentials = { name, customerId, email, password };
    const url = `${this.baseurl}/signup`;

    return lastValueFrom(this.http.post<any>(url, credentials).pipe(
      catchError(this.errorHandler),
    ));
  }

  errorHandler(result: HttpErrorResponse): Observable<never> {
    const errorResponse = {
      success: result.error.success,
      status: result.status,
      message: '',
    };

    if (result?.error?.message) {
      errorResponse.message = result.error.message;
      console.log(`[${result.status}] - Message: ${result.error.message}`);
    } else if (result?.error?.validationErrors?.length > 0) {
      console.log(`[${result.status}] - Message: Validation Error.`);
      console.table(result.error.validationErrors);
    } else if (result?.error) {
      console.log(`[${result.status}] - Message: ${result.error}`);
    } else {
      console.log(`[${result.status}] - Message: ${result.message}`);
    }

    return throwError(() => errorResponse);
  }


  async handlePromises(promise: Promise<any>): Promise<Promise<any>> {
    try {
      const data = await promise;
      return [data, null];
    } catch (error) {
      return [null, error];
    }
  }
}

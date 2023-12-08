import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {User} from '../models/user';
import {environment} from '../../environments/environment';
import {ErrorService} from './error.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users: User[] = [];
  private baseUrl = environment.apiUrl;



  constructor(
    private readonly http: HttpClient,
    private errorService: ErrorService
  ) {
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`)
      .pipe(
        tap((users: User[]) => this.users = users)
      );
  }

  public getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`)
      .pipe(
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.errorService.handler(error.message);
    return throwError(() => error.message);
  }

}

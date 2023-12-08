import {Injectable} from '@angular/core';
import {catchError, Observable, ObservableInput, tap, throwError} from 'rxjs';
import {Tokens} from '../models/Tokens';
import {User} from '../models/user';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import {TokenService} from './token.service';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {DeleteUser, LoadUser} from '../store/user/user.actions';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public error: string;
  private baseUrl = environment.apiUrl;
  private user: User;


  constructor(
    private store: Store<State>,
    private readonly http: HttpClient,
    private readonly tokenService: TokenService
  ) {
  }

  public logout(): void {
    this.tokenService.AccessToken = '';
    this.tokenService.RefreshToken = '';
    this.store.dispatch(new DeleteUser());

  }

  public login(email: string, password: string): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.baseUrl}/auth/login`, {
      email,
      password
    }).pipe(
      tap(value => this.processLoginResponse(value)),
      catchError(this.handleError)
    );

  }


  public signUp(name: string, email: string, password: string): Observable<Tokens> {
    return this.http.post<Tokens>(`${this.baseUrl}/auth/register`, {
      name,
      email,
      password
    }).pipe(
      tap(value => this.processLoginResponse(value))
    );
  }

  private processLoginResponse(value: Tokens): void {
    this.tokenService.AccessToken = value.accessToken;
    this.tokenService.RefreshToken = value.refreshToken;
    this.tokenService.expireToken = jwt_decode(this.tokenService.AccessToken)['exp'];

    this.user = {
      id: jwt_decode(this.tokenService.AccessToken)['id'],
      email: jwt_decode(this.tokenService.AccessToken)['email'],
      userName: jwt_decode(this.tokenService.AccessToken)['userName'],
    };
    this.store.dispatch(new LoadUser({user: this.user}));
  }


  private handleError(error: HttpErrorResponse):Observable<never> {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      // eslint-disable-next-line no-console
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      // eslint-disable-next-line no-console
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }



}



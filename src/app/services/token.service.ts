import {Injectable} from '@angular/core';
import {Observable, tap} from 'rxjs';
import {Tokens} from '../models/Tokens';
import jwt_decode from 'jwt-decode';
import {HttpClient} from '@angular/common/http';
import {LoadUser} from '../store/user/user.actions';
import {User} from '../models/user';
import {Store} from '@ngrx/store';
import {State} from '../store';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  public expireToken = 0;
  public user: User;
  private baseUrl = environment.apiUrl;

  constructor(private store: Store<State>, private readonly http: HttpClient) {
  }

  public get AccessToken(): string {
    return this.getLocalStorageData('accessToken');
  }

  public set AccessToken(token: string) {
    this.setLocalStorageData('accessToken', token);
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  public get RefreshToken(): string {
    return this.getLocalStorageData('refreshToken');
  }

  public set RefreshToken(token: string) {
    this.setLocalStorageData('refreshToken', token);
  }

  public refreshTokens(): Observable<Tokens> {

    return this.http.post<Tokens>(`${this.baseUrl}/auth/refresh`, {
      refreshToken: this.RefreshToken,
      accessToken: this.AccessToken
    }).pipe(
      tap(value => {
        this.AccessToken = value.accessToken;
        this.RefreshToken = value.refreshToken;
        this.expireToken = jwt_decode(this.AccessToken)['exp'];

        this.user = {
          id: jwt_decode(this.AccessToken)['id'],
          email: jwt_decode(this.AccessToken)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
          userName: jwt_decode(this.AccessToken)['userName'],
        };

        this.store.dispatch(new LoadUser({user: this.user}));

        this.scheduleTokenRefresh();
      })
    );
  }

  private scheduleTokenRefresh(): void {
    if (!this.expireToken) {
      return;
    }
    const tokenIn = new Date(this.expireToken * 1000);


    if (new Date() >= tokenIn) {
      this.refreshTokens().subscribe();
    } else {
      setTimeout(() => {
        this.scheduleTokenRefresh();
      }, tokenIn.getTime() - Date.now());
    }


  }

  private setLocalStorageData(key: string, value: string): void {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.localStorage.setItem(key, value);
  }

  private getLocalStorageData(key: string): string {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return window.localStorage.getItem(key);
  }
}


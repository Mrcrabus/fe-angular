import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Post} from '../models/post';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  public posts: Post[] = [];
  public post: Post;
  private baseUrl = 'http://localhost:5246/api';

  constructor(
    private readonly http: HttpClient,
    private readonly errorService: ErrorService
  ) {
  }

  public getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`, {
      params: new HttpParams({
        fromString: 'limit=50'
      })
    }).pipe(
      tap(posts => this.posts = posts),
      catchError(this.errorHandler.bind(this))
    );
  }

  public getPostById(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/post/${postId}`).pipe(
      tap(post => this.post = post),
      catchError(this.errorHandler.bind(this))
    );
  }

  public getPostByIdUser(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts/${userId}`).pipe(
      tap(posts => this.posts = posts),
      catchError(this.errorHandler.bind(this))
    );
  }

  public create(title: string, description: string): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/posts`, {
      title,
      description
    }).pipe(
      tap(post => this.posts.unshift(post))
    );
  }

  public edit(title: string, description: string): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/posts`, {
      title,
      description
    });
  }

  public delete(postId: string): Observable<any> {
    return this.http.delete<Post>(`${this.baseUrl}/posts/${postId}`);
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    this.errorService.handler(error.message);
    return throwError(() => error.message);
  }

}

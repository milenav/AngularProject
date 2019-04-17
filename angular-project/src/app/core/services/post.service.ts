import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_KEY } from '../../kinvey.tokens';
import { Post } from 'src/app/components/shared/models/post.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private readonly BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}`;
  private readonly ALL_POSTS = `${this.BASE_URL}/posts`;
  private readonly CREATE_POST = `${this.BASE_URL}/posts`;

  constructor(private http: HttpClient)  { }

  getAll(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.ALL_POSTS);
  }

  createPost(body: Object) {
    return this.http.post(this.CREATE_POST, body);
  }

  getDetails(id: string): Observable<Post> {
    return this.http.get<Post>(this.CREATE_POST + `/${id}`);
  }

  editPost(body: Object, id: string) {
    return this.http.put(this.CREATE_POST + `/${id}`, body);
  }

  deletePost(id: string) {
    return this.http.delete(this.CREATE_POST + `/${id}`);
  }

}

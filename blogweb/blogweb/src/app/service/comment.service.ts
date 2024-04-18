import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }
  
  createComment(postId: number, userId:number, content: string): Observable<any> {
    const params = {
      postId: postId,
      userId:userId,
    };
  
    return this.http.post<any>(BASIC_URL + '/api/comment/create',content,{params});
  }

  getAllCommentsByPost(postId:number):Observable<any>{
    return this.http.get(BASIC_URL+`/api/comment/${postId}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http:HttpClient) { }

  createNewPost(data:any):Observable<any>{
    return this.http.post(BASIC_URL+ `/api/posts/${data.userId}`, data);
  }

  getAllPosts():Observable<any>{
    return this.http.get(BASIC_URL+ '/api/posts');
  }

  getPostById(postId:number):Observable<any>{
    return this.http.get(BASIC_URL+ `/api/posts/${postId}`);
  }

  likePost(postId:number):Observable<any>{
    return this.http.put(BASIC_URL+ `/api/posts/${postId}/like`,{});
  }

  searchByName(name:string):Observable<any>{
    return this.http.get(BASIC_URL+ `/api/posts/search/${name}`);
  }

  getPopularPost():Observable<any>{
    return this.http.get(BASIC_URL+ '/api/posts/popular');
  }

  updatePost(post: any):Observable<any> {
    console.log(post);
    
    return this.http.put(BASIC_URL+ `/api/posts/${post.id}`,post);
  }

  getPostByUserId(userId:number){
    return this.http.get(BASIC_URL+ '/api/posts/user/'+userId);
  }

  deletePost(id:number){
    return this.http.delete(BASIC_URL+'/api/posts/'+id);
  }
}

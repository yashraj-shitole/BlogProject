import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public userData: {};

  constructor(private http:HttpClient) { }

  registerUser(data:any):Observable<any>{
    
    if(data.gender === "male"){
      data.image = `https://avatar.iran.liara.run/public/boy?username=${data.fullName}`;
    }else{
      data.image =  `https://avatar.iran.liara.run/public/girl?username=${data.fullName}`;
    }
    // data.image = `https://api.multiavatar.com/${data.fullName}`;
  
    return this.http.post(BASIC_URL+"/api/user",data);
  }

  loginUser(email:string, password:string):Observable<any>{
    return this.http.get(BASIC_URL+`/api/user/${email}/${password}`)
  }

  isUserLoggedIn(){
    let user=sessionStorage.getItem('user');
   // alert("user="+user);
    return !(user===null)
  }

  getUserData(){
    return sessionStorage.getItem('user');
  }

  setUserData(data:any){
    this.userData = data;
  }

  logout(){
    sessionStorage.removeItem('user');
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.css']
})
export class MyPostComponent {
  posts:any;
  user:any;

  constructor(private userService:UserService,private postService:PostService, private toast : ToastrService, private router:Router){}

  ngOnInit(){
    this.user = this.userService.userData;
    this.getPosts();
  }

  getPosts(){
    this.postService.getPostByUserId(this.user.id).subscribe(
      res=>{
        this.posts = res; 
      }, 
      err=>{
        this.toast.error(err.message,"Error")
      }
    )
  }

  deletePost(id:number){
    if(window.confirm("Do you want to delete this Post?")){
      this.postService.deletePost(id).subscribe(
        res=>{
          window.location.reload();
        },
        err=>{
          window.location.reload();
        }
      )
    }
  }

  goToUpdate(post: any) {
    // Using Query Parameters
    this.router.navigate(['/update'], { queryParams: { id: post.id, data: JSON.stringify(post) } });
  }
  

  getUser(){
    this.user = this.userService.userData;
  }
}

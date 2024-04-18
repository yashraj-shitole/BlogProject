import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.css']
})
export class ViewAllComponent {
  posts:any;
  items: any[] = []; // Your array of items to paginate
  pageSize: number = 3; // Number of items per page
  p: number = 1; // Initial page number

  constructor(
    private postService:PostService,
    private toastr: ToastrService
  ) {}

  ngOnInit(){
    this.getAllPosts();
  }

 
  getAllPosts(){
    this.postService.getAllPosts().subscribe(
      res=>{
        this.posts = res;
        console.log(this.posts);
        
      },
      error=>{
        this.toastr.error(error.message, "Error")
      }
    )
  }
}

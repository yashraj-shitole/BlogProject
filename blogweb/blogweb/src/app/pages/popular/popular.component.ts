import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent {
  popularList:any = [];

  constructor(private postService:PostService, private toastr:ToastrService){}

  ngOnInit(){
    this.getPopulatPost();
  }

  getPopulatPost(){
    this.postService.getPopularPost().subscribe(
      res=>{
        this.popularList = res;
        console.log(this.popularList);
      },
      err=>{
        this.toastr.error(err.message,"Error");
      }
    )
  }

}

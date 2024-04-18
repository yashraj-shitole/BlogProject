import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  result:any = [];
  name:any = "";

  constructor(private postService:PostService, private toastr: ToastrService){}

  searchByName(){
    this.postService.searchByName(this.name).subscribe(
      res=>{
        this.result = res;
        console.log(this.result);
        
      }, err=>{
        this.toastr.error(err.message,"Error")
      }
    )
  }
}

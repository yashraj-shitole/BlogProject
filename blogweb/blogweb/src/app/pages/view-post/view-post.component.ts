import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/service/comment.service';
import { PostService } from 'src/app/service/post.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent {
  postId = this.activatedRoute.snapshot.params['id'];
  postData: any;
  commentForm: FormGroup;
  comments: any;
  user: any;
  postLiked: boolean = false;

  
  constructor(
    private postService: PostService,
    private router:Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private userService: UserService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.getPostById();
    this.commentForm = this.fb.group({
      content: [null, Validators.required]
    })
    this.user = this.userService.userData;
  }

  

  publishComment() {
    const content = this.commentForm.get('content').value;

    this.commentService.createComment(this.postId, this.user.id, content).subscribe(
      res => {
        this.toastr.success("Comment Posted", "Success");
        this.commentForm.reset();
        this.getCommentsByPost();
      },
      err => {
        this.toastr.error(err.message, "Error");
      }
    )
  }

  getCommentsByPost() {
    this.commentService.getAllCommentsByPost(this.postId).subscribe(
      res => {
        this.comments = res;
        console.log(this.comments);
      },
      err => {
        this.toastr.error(err.message, "Error");
        console.log(err);
      }
    );
  }

  getPostById() {
    this.postService.getPostById(this.postId).subscribe(
      res => {
        this.postData = res;
        console.log(res);
        this.getCommentsByPost();
      },
      err => {
        this.toastr.error(err.message, "Error")
      }
    )
  }

  likePost() {
    this.postService.likePost(this.postId).subscribe(
      res => {
        this.toastr.success("Post liked successfully", "Success");
        this.getPostById();
        this.postLiked = true; // Set postLiked to true after liking the post
      },
      err => {
        this.toastr.error(err.message, "Error");
      }
    )
  }

  // deletePost() {
  //   if (confirm("Do you want to delete this post?")) {
  //     this.router.navigateByUrl('/',{replaceUrl:true});
  //     this.postService.deletePost(this.postData.id).subscribe(
  //       () => {
  //         this.toastr.success("Post deleted", "Success");
  //         // Check if the post deletion was successful, then reset the postData
  //         this.postData = null;
  //       },
  //       err => {
  //         this.toastr.error(err.message, "Error");
  //       }
  //     );
  //   }
  // }
  
  // updatePost() {
  //   this.router.navigateByUrl(`/update/${this.postData.id}`)
  // }
}

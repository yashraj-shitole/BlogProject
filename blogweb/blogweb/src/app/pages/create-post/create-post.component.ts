import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/service/post.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {
  postForm!: FormGroup;
  tags: string[] = [];
  user:any;

  constructor(
    private userService :UserService,
    private fb: FormBuilder,
    private router: Router,
    private postService: PostService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      name: [null, Validators.required],
      content: [null, [Validators.required, Validators.maxLength(5000)]],
      img: [null, Validators.required],
    })

    this.user = this.userService.userData;   
  }

  addTag(event: any): void {
    event.preventDefault(); // Prevent default form submission behavior
    const value = event.target.value.trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
      event.target.value = '';
    }
  }

  removeTag(chip: string): void {
    const index = this.tags.indexOf(chip);
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  }

  createPost() {
    const data = this.postForm.value;
    data.tags = this.tags;
    data.userId = this.user.id;
    data.user = this.user;

    this.postService.createNewPost(data).subscribe(
      res => {
        this.toastr.success('Blog posted successfully!', 'Success!');
        this.router.navigateByUrl('/');
      },
      error => {
        this.toastr.error(error.message,"Error")
      })
  }
}

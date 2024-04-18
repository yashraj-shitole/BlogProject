import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id = this.activatedRoute.snapshot.params['id'];
  post: any;
  postForm: FormGroup;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private toast: ToastrService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.post = JSON.parse(params['data']);
    });

    this.postForm = this.fb.group({
      name: [this.post.name, Validators.required],
      img: [this.post.img, Validators.required],
      content: [this.post.content, Validators.required],
    });

    this.postForm.valueChanges.subscribe(() => {
      // Enable/disable update button based on form validity and changes
      this.updateButtonDisabled();
    });
  }

  updateButtonDisabled() {
    const isFormValid = this.postForm.valid;
    const isFormDirty = this.postForm.dirty;
    return !isFormValid || !isFormDirty;
  }

  updatePost() {
    if (this.postForm.valid) {
        const updatedPost = {
            ...this.post,
            name: this.postForm.get('name').value,
            img: this.postForm.get('img').value,
            content: this.postForm.get('content').value
        };

        this.postService.updatePost(updatedPost).subscribe(
            res => {
                this.toast.success("Post Updated");
                console.log(res);
                this.router.navigateByUrl('/my-posts');
            },
            err => {
                this.toast.error(err.message, "Error");
            }
        );
    } else {
        this.toast.error("Form is invalid. Please fill in all required fields.", "Error");
    }
}


  addTag(event: any): void {
    event.preventDefault(); // Prevent default form submission behavior
    const value = event.target.value.trim();
    if (value && !this.post.tags.includes(value)) {
      this.post.tags.push(value);
      event.target.value = '';
    }
  }

  removeTag(chip: string): void {
    const index = this.post.tags.indexOf(chip);
    if (index !== -1) {
      this.post.tags.splice(index, 1);
    }
  }


}


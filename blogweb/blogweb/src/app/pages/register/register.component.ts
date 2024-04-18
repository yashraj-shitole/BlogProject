import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService) { }

    ngOnInit() {
      this.registerForm = this.fb.group({
        fullName: [null, Validators.required],
        email: [null, [Validators.required]],
        password: [null, Validators.required],
        gender:[null,Validators.required]
      })
    }

    registerUser() {
      const data = this.registerForm.value;
      this.userService.registerUser(data).subscribe(
        res => {
          this.toastr.success('Registration successful!', 'Success!');
          this.router.navigateByUrl('/login');
        },
        error => {
          this.toastr.error(error.message,"Error")
        })
    }
}

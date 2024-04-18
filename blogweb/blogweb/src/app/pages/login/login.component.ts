import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string="";
  password:string="";

  constructor(private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService){}

    loginUser(){
      if(this.password === "", this.email === ""){
        this.toastr.warning("Please fill all the fields","Warning")
      }

      this.userService.loginUser(this.email,this.password).subscribe(
        res=>{
          if(res){
            sessionStorage.setItem('user',JSON.stringify(res));
            this.toastr.success("Login successful","Success");
            this.router.navigateByUrl('/');
          }
        },
        err=>{
          this.toastr.error("Invalid username or password","Error")
        }
      )
    }
}

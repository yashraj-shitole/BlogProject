import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RouteGuardService } from 'src/app/service/route-guard.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user:any;
  isDropdownOpen: boolean = false;

  constructor(private userService:UserService, private toastr : ToastrService) { }

  ngOnInit(){
    this.getUserData();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
}

stopPropagation(event: Event) {
    event.stopPropagation();
}

  getUserData(){
    this.user = JSON.parse(this.userService.getUserData());
    this.userService.setUserData(this.user);
    console.log(this.user);
  }

  logout(){
    this.toastr.success("Logout successful")
    this.userService.logout();
    window.location.reload();
  }
}

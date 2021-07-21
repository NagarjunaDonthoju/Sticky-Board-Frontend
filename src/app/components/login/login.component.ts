import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, map, take } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/utils/user';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private router : Router,
    private notifierService : NotifierService,
    private userService : UserService,
    private spinner : NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  loginWithGoogle(){

    this.spinner.show("loader");
    this.authService.loginWithGoogle().then(res =>{

      const isNewUser : Boolean | undefined = res['additionalUserInfo']?.isNewUser;

      if(isNewUser){

          this.userService.addUser(res)?.pipe(first()).subscribe((userInfo : User) => {
            this.userService.userData = userInfo;
            this.notifierService.hideAll();
            this.notifierService.notify("success", "User successfully logged in");
            console.log("User successfully logged in: ", res);
            this.spinner.hide("loader");
            this.router.navigateByUrl('/profile');
          })

      }
      else{
        this.notifierService.notify("success", "User successfully logged in");
        console.log("User successfully logged in: ", res);
        this.spinner.hide("loader");
        this.router.navigateByUrl('/profile');
      }

    }).catch(error =>{
      this.spinner.hide("loader");
      this.notifierService.hideAll();
      this.notifierService.notify("error", error['code']);
      console.log('Error: ', error);
      
    });
  }

}

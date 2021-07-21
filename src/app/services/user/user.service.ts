import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import auth from 'firebase/app'
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/utils/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData : User | null = null;
  constructor( private httpService : HttpService, private spinner : NgxSpinnerService) { }




  getUser(uid : string, func : Function){
    this.spinner.show("loader");
    this.httpService.getUser(uid).pipe(first()).subscribe((res : any) => {
      this.userData = res;
      func();
      this.spinner.hide("loader");
    })

  }

  addUser(user : auth.auth.UserCredential){
    return this.httpService.addUser(user);
  }

  updateUser(firstName : string, lastName : string){
    return this.httpService.updateUser(firstName, lastName);
  }

}

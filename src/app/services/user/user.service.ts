import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import auth from 'firebase/app'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData : any = null;
  constructor( private httpService : HttpService) { }




  getUser(uid : string){
    return this.httpService.getUser(uid);
  }

  addUser(user : auth.auth.UserCredential){
    return this.httpService.addUser(user);
  }

  updateUser(firstName : string, lastName : string){
    return this.httpService.updateUser(firstName, lastName);
  }

}

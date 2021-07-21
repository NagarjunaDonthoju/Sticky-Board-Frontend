import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import auth from 'firebase/app';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uid : any = null;
  authUser : any = null;

  constructor(
    private angularFireAuth : AngularFireAuth,
    private router : Router
  ) { 

    this.isLoggedIn().pipe(first()).subscribe(user=>{

      this.updateUserUID(user);
      
    })

  }

  async loginWithGoogle(){
    return this.authLogin(new auth.auth.GoogleAuthProvider);
  }

  async authLogin(provider: auth.auth.AuthProvider){
    return this.angularFireAuth.signInWithPopup(provider);
  }
  
  isLoggedIn(){
    return this.angularFireAuth.authState;
  }

  logOut(){
    return this.angularFireAuth.signOut();
  }

  getIdToken(){
    return this.angularFireAuth.idToken;
  }

  updateUserUID(user : any){
    if(user){
      this.uid = user.uid;
      this.authUser = user;
      return;
    }

    this.uid = null;
    this.authUser = null;

  }
}

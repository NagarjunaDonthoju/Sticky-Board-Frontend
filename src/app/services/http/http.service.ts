import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import auth from 'firebase/app';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private BASE_URL : string = "http://localhost:8080/api/v1"; 

  constructor(
    private http : HttpClient,
    private authService : AuthService
  ) { }


  addUser(userCredential : auth.auth.UserCredential){

    const url : string = `${this.BASE_URL}/users`
    const profile : any = userCredential['additionalUserInfo']?.['profile'];
    
    const body = {
      firstName : profile['given_name'],
      lastName : profile['family_name'],
      photoURL : profile['picture'],
      email : profile['email'],
      uid : userCredential['user']?.uid
    }
    
    return this.http.post(url, body);
    
  }

  getUser(uid : String){
    const url : string = `${this.BASE_URL}/users/${uid}`;
    return this.http.get(url);
  }

  updateUser(firstName : string, lastName : string){

    const url : string = `${this.BASE_URL}/users/${this.authService.uid}`;
    const body = {
      firstName : firstName,
      lastName : lastName,
      uid : this.authService.uid
    }
    
    return this.http.put(url, body);

  }

  getBoardsByUID(uid : string){
    const url : string = `${this.BASE_URL}/boards/${uid}`;
    return this.http.get(url);
  }

  getAllBoards(){
    const url : string = `${this.BASE_URL}/boards`;
    return this.http.get(url);
  }

  getCardsInBoard(boardID : number){
    const url : string = `${this.BASE_URL}/cards/${boardID}`;
    return this.http.get(url);
  }

  createBoard(boardName : string, uid: string){
    const url : string = `${this.BASE_URL}/boards`;

    const body = {
      name : boardName,
      uid : uid
    }

    return this.http.post(url, body);
  } 

  createCard(description : string, uid : string, boardID : number){

    const url : string = `${this.BASE_URL}/cards`;

    const body = {
      uid, boardID, description
    }

    return this.http.post(url, body);
  }

  getBoardDetails(uid : string, boardID : number){
    const url : string = `${this.BASE_URL}/boards/${uid}/${boardID}`;
    return this.http.get(url);
  }

}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { Board } from 'src/app/utils/board';
import { Card } from 'src/app/utils/card';
import { DEFAULT_LIMIT, DEFAULT_TIMESTAMP } from 'src/app/utils/constants';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';



@Injectable({
  providedIn: 'root'
})
export class BoardService {

  boards : Array<Board> = [];
  boardsNext : boolean = false;

  myBoards : Array<Board> = [];
  myBoardsNext : boolean = false;

  cards : Map<number, Array<Card>> = new Map<number, Array<Card>>();
  cardsNext : Map<number, boolean> = new Map<number, boolean>();

  currentBoard : Board | null = null;

  constructor(
    private httpService : HttpService,
    private spinner : NgxSpinnerService,
    private userService : UserService,
    private notifierService : NotifierService,
    private router : Router
  ) { }


  findBoardsByUID(uid : string, refresh : boolean = false, limit : number = DEFAULT_LIMIT, curTimestamp : number = DEFAULT_TIMESTAMP){

    this.spinner.show("loader");
    
    if(refresh){
      this.myBoards = [];
    }

    this.httpService.getBoardsByUID(uid, limit, curTimestamp).pipe(first()).subscribe(res => {
      const boardsInfo = JSON.parse(JSON.stringify(res)); 

      if(boardsInfo.length < limit){
        this.myBoardsNext = false;
      }
      else{
        this.myBoardsNext = true;
      }

      boardsInfo.forEach((board: { [x: string]: any; }) => {
        const obj = {
          id : board['id'],
          name : board['name'],
          createdAt : board['createdAt'],
  
          userDetails : {
            firstName : this.userService.userData!['firstName'],
            lastName : this.userService.userData!['lastName'],
            photoURL : this.userService.userData!['photoURL'],
            email : this.userService.userData!['email']
          }
        }
      this.myBoards.push(obj);
      })
      this.spinner.hide("loader");
    })
  }

  getAllBoards(refresh : boolean = false, limit : number = DEFAULT_LIMIT, curTimestamp : number = DEFAULT_TIMESTAMP){
    this.spinner.show('loader');

    if(refresh){
      this.boards = [];
    }

    this.httpService.getAllBoards(limit, curTimestamp).pipe(first()).subscribe(res =>{
      const boardsInfo = JSON.parse(JSON.stringify(res));
      
      if(boardsInfo.length < limit){
        this.boardsNext = false;
      }
      else{
        this.boardsNext = true;
      }

      boardsInfo.forEach((board: { [x: string]: any; }) => {
        const obj = {
          id : board['id'],
          name : board['name'],
          createdAt : board['createdAt'],
  
          userDetails : {
            firstName : board['firstName'],
            lastName : board['lastName'],
            photoURL : board['photoURL'],
            email : board['email']
          }
        }
        this.boards.push(obj);
      })
      this.spinner.hide('loader');
    });
  }

  getCardsInBoard(boardID : number, refresh : boolean = false, limit : number = DEFAULT_LIMIT, curTimestamp : number = DEFAULT_TIMESTAMP){
    this.spinner.show('loader');

    if(refresh){
      this.cards.delete(boardID);
    }

    this.httpService.getCardsInBoard(boardID, limit, curTimestamp).pipe(first()).subscribe(res => {

      if(!this.cards.has(boardID)){
        this.cards.set(boardID, []);
      }
      const cardsInfo : Array<Card> = JSON.parse(JSON.stringify(res));

      if(cardsInfo.length < limit){
        this.cardsNext.set(boardID, false);
      }
      else{
        this.cardsNext.set(boardID, true);
      }

      cardsInfo.forEach((card: Card) =>{
        this.cards.get(boardID)?.push(card);
      })
      this.spinner.hide('loader');

    }, err =>{
      this.spinner.hide('loader');
      this.notifierService.notify('error', err['error']['message'] );
      this.router.navigateByUrl('/boards');
    })
  }

  createBoard(boardName : string, uid: string){

    if(boardName == "" || uid == null){
      return;
    }

    this.spinner.show('loader');

    this.httpService.createBoard(boardName, uid).pipe(first()).subscribe(res => {
      
      const boardInfo = JSON.parse(JSON.stringify(res));

      const board = {
        id : boardInfo['id'],
        name : boardInfo['name'],
        createdAt : boardInfo['createdAt'],

        userDetails : {
          firstName : this.userService.userData!['firstName'],
          lastName : this.userService.userData!['lastName'],
          photoURL : this.userService.userData!['photoURL'],
          email : this.userService.userData!['email']
        }
      }

      this.myBoards.unshift(board);
      this.spinner.hide('loader');
      this.notifierService.notify("success", 'Board successfully created');
    });
    return this.httpService.createBoard(boardName, uid);

  }

  createCard(description : string, uid : string, boardID : number ){
    if(description == "" || uid == null){
      return;
    }

    this.spinner.show('loading');

    this.httpService.createCard(description, uid, boardID).pipe(first()).subscribe(res => {
      
      let cardInfo : Card = JSON.parse(JSON.stringify(res));
      cardInfo['email'] = this.userService.userData!['email'];
      cardInfo['firstName'] = this.userService.userData!['firstName'];
      cardInfo['lastName'] = this.userService.userData!['lastName'];
      cardInfo['photoURL'] = this.userService.userData!['photoURL'];

      if(!this.cards.has(boardID)){
        this.cards.set(boardID, []);
      }

      this.cards.get(boardID)!.push(cardInfo);
      this.spinner.hide('loader');
      this.notifierService.notify("success", 'Card successfully created');

    }, err =>{
      this.spinner.hide('loader');
      this.notifierService.notify('error', err['error']['message'] );
    });
  }

  getBoardDetails(uid : string, boardID : number){
    if(uid == null){
      return;
    }

    if(this.currentBoard != null){
      return;
    }

    this.spinner.show('loading');

    this.httpService.getBoardDetails(uid, boardID).pipe(first()).subscribe(res => {
      const board = JSON.parse(JSON.stringify(res));

      const obj = {
        id : board['id'],
        name : board['name'],
        createdAt : board['createdAt'],

        userDetails : {
          firstName : board['firstName'],
          lastName : board['lastName'],
          photoURL : board['photoURL'],
          email : board['email']
        }
      }

      this.currentBoard = obj;
      this.spinner.hide('loader');
    });
  }

}

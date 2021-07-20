import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { UserService } from 'src/app/services/user/user.service';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['../boards.component.css','./board.component.css']
})
export class BoardComponent implements OnInit {

  boardID : number = -1;

  constructor(
    public boardService : BoardService,
    private spinner : NgxSpinnerService,
    private activatedRoute : ActivatedRoute,
    private router : Router,
    private notifierService : NotifierService,
    private dialog : MatDialog,
    private authService : AuthService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
      this.boardID = parseInt(this.activatedRoute.snapshot.params['boardID']);
      
      if(isNaN(this.boardID)){
        this.notifierService.notify('error', "Invalid board ID");
        this.router.navigateByUrl('/boards');
      }
      else{
        this.getBoardDetails(this.authService.uid, this.boardID);
        if(this.boardService.cards[this.boardID] == undefined ){
          this.getCardsInBoard();
        }
        
      }
      
  }

  getCardsInBoard(){
    this.boardService.getCardsInBoard(this.boardID);
  }

  refresh(){
    delete this.boardService.cards[this.boardID];
    this.getCardsInBoard();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width : "80%",
      maxWidth : "375px",
      panelClass : "custom-modal-class",
      data: { heading: "Add a card...", description: "" }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res != undefined){
        this.createCard(res.trim(), this.authService.uid, this.boardID);
      }
    });
  }

  createCard(description : string, uid : string, boardID : number){
    this.boardService.createCard(description, uid, boardID);
  }

  getBoardDetails(uid : string, boardID : number){
    this.boardService.getBoardDetails(uid, boardID);
  }

  ngDestroy(){
    this.boardService.currentBoard = null;
  }

}

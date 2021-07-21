import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { UserService } from 'src/app/services/user/user.service';
import { DEFAULT_LIMIT, DEFAULT_TIMESTAMP } from 'src/app/utils/constants';
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
        if(this.userService.userData == null){
          const uid = this.authService.uid;
          this.userService.getUser(uid, ()=>{});
        }
        this.getBoardDetails(this.authService.uid, this.boardID);
        if(!this.boardService.cards.has(this.boardID)){
          this.getCardsInBoard(true);
        }
        
      }
      
  }

  getCardsInBoard(refresh : boolean): void{
    this.boardService.getCardsInBoard(this.boardID, refresh, DEFAULT_LIMIT, DEFAULT_TIMESTAMP);
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

  createCard(description : string, uid : string, boardID : number): void{

      this.boardService.createCard(description, uid, boardID);

  }

  getBoardDetails(uid : string, boardID : number): void{
    this.boardService.getBoardDetails(uid, boardID);
  }


  loadMore(): void {

    const cardsLength : any = this.boardService.cards.get(this.boardID)!.length;
    let curTimestamp : any = this.boardService.cards.get(this.boardID)![cardsLength - 1]['createdAt'];
    this.boardService.getCardsInBoard(this.boardID, false, DEFAULT_LIMIT, curTimestamp);

  }

  ngDestroy(): void{
    this.boardService.currentBoard = null;
  }

}

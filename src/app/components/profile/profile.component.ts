import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { UserService } from 'src/app/services/user/user.service';
import { DEFAULT_LIMIT } from 'src/app/utils/constants';
import { EditProfileModalComponent } from '../edit-profile-modal/edit-profile-modal.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../boards/boards.component.css','./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService : AuthService,
    public userService : UserService,
    private spinner: NgxSpinnerService,
    public boardService : BoardService,
    private dialog : MatDialog,
    private notifierService : NotifierService,
    private router : Router
  ) { }

  ngOnInit(): void {

    if(this.userService.userData == null){
      this.getUserInfo();
    }
    else{
      this.getMyBoards();
    }

  }

  getUserInfo(){
    
    const uid = this.authService.uid;
    this.userService.getUser(uid, this.getMyBoards.bind(this));
  }

  getMyBoards(){
    this.boardService.findBoardsByUID(this.authService.uid, true);
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width : "80%",
      maxWidth : "375px",
      panelClass : "custom-modal-class",
      data: { heading: "Create a board", description: "" }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res != undefined){
        this.createBoard(res.trim(), this.authService.uid);
      }
    });
  }

  openEditProfileDialog(): void {

    const dialogRef = this.dialog.open(EditProfileModalComponent, {
      width : "80%",
      maxWidth : "375px",
      panelClass : "custom-modal-class",
      data: { 
        heading: "Edit Your Profile",
        firstName: this.userService.userData!['firstName'],
        lastName : this.userService.userData!['lastName'] 
      }
    });

    dialogRef.afterClosed().subscribe(res => {
        if(res != undefined){
          console.log(res);
        }
    });
  }

  createBoard(boardName : string, uid : string): void{
    this.boardService.createBoard(boardName, uid);
  }

  goToBoard(boardID : number, index : number){
    this.boardService.currentBoard = this.boardService.myBoards[index];
    this.router.navigateByUrl(`/boards/${boardID}`)
  }

  loadMore(){

    const myBoardsLength = this.boardService['myBoards'].length;

    const curTimestamp : number = this.boardService['myBoards'][myBoardsLength - 1]['createdAt'];

    this.boardService.findBoardsByUID(this.authService.uid, false, DEFAULT_LIMIT, curTimestamp);

  }

}

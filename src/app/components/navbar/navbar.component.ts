import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BoardService } from 'src/app/services/board/board.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authService : AuthService,
    public router : Router,
    private userService : UserService,
    private boardService : BoardService
  ) { }

  ngOnInit(): void {
  }
  
  logOut(){
    this.authService.logOut().then((res) =>{
      console.log("Successfully Logged out");
      this.authService.uid = null;
      this.authService.authUser = null;
      this.boardService.boards = [];
      this.boardService.myBoards = [];
      this.userService.userData = null;
      this.boardService.currentBoard = null;
      this.router.navigateByUrl('/login');
    }).catch(error =>{
      console.log("Error: ", error);
    })
  }

  goTo(url: string){
    this.router.navigateByUrl(url);
  }
} 

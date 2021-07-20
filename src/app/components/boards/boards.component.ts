import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit{

  constructor(
    public boardService : BoardService,
    private spinner : NgxSpinnerService,
    private router : Router
  ) { }

  ngOnInit(): void {

    if(this.boardService['boards'].length == 0){
      this.getAllBoards();
    }

  }


  getAllBoards(){
    this.boardService.getAllBoards();
  }

  goToBoard(boardID : string, index : number){
    this.boardService.currentBoard = this.boardService.boards[index];
    this.router.navigateByUrl(`/boards/${boardID}`);
  }
}

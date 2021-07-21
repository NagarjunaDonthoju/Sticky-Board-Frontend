import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { BoardService } from 'src/app/services/board/board.service';
import { DEFAULT_LIMIT } from 'src/app/utils/constants';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit{

  constructor(
    public boardService : BoardService,
    private router : Router
  ) { }

  ngOnInit(): void {

    if(this.boardService['boards'].length == 0){
      this.getAllBoards();
    }
    

  }


  getAllBoards(refresh : boolean = false){
    this.boardService.getAllBoards(refresh);
  }

  goToBoard(boardID : number, index : number){
    this.boardService.currentBoard = this.boardService.boards[index];
    this.router.navigateByUrl(`/boards/${boardID}`);
  }

  loadMore(){
    const boardsLength = this.boardService['boards'].length;

    const curTimestamp : number = this.boardService['boards'][boardsLength - 1]['createdAt'];

    this.boardService.getAllBoards(false, DEFAULT_LIMIT, curTimestamp);
  }

}

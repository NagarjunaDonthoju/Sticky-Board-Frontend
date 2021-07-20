import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalData } from './modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {

  constructor(
    public dialogRef : MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data : ModalData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  keydown(e:any){
    if(this.data.description.length >= 50){
      return  e.stopPropagation();
    }
  }

}

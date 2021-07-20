import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'angular-notifier';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/services/user/user.service';
import { EditProfileModalData } from './editProfileModal';

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.css']
})
export class EditProfileModalComponent implements OnInit {

  constructor(
    public dialogRef : MatDialogRef<EditProfileModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data : EditProfileModalData ,
    private userService : UserService,
    private notifierService : NotifierService,
    private spinner : NgxSpinnerService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  keydownF(e:any){
    if(this.data.firstName.length >= 75){
      return  e.stopPropagation();
    }
  }
  keydownL(e:any){
    if(this.data.firstName.length >= 75){
      return  e.stopPropagation();
    }
  }

  update(){
    this.spinner.show('loader');
    this.dialogRef.close();
    this.userService.updateUser(this.data.firstName, this.data.lastName).pipe(first()).subscribe(res =>{
      this.userService.userData = res;
      this.notifierService.hideAll();
      this.notifierService.notify("success", "User details successfully updated");
      this.spinner.hide("loader");

    }, err =>{
      this.spinner.hide("loader");
      this.notifierService.hideAll();
      this.notifierService.notify("error", err['message']);
    })
  }

}

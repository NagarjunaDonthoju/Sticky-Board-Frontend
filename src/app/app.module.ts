import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';
import { AngularFireModule  } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NotifierModule } from 'angular-notifier';
import { HeaderInterceptor } from './interceptors/headerInterceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalComponent } from './components/modal/modal.component';
import { AngularMaterialModule } from './angular-material.module';
import { FormsModule } from '@angular/forms';
import { EditProfileModalComponent } from './components/edit-profile-modal/edit-profile-modal.component';
import { CustomPipesModule } from './pipes/custom-pipes/custom-pipes.module';

const notificationConfig :any = {
  position : {
    horizontal : {
      position : "right"
    },
    vertical : {
      position : "top"
    }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    NavbarComponent,
    ModalComponent,
    EditProfileModalComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment),
    AngularFireAuthModule,
    HttpClientModule,
    NotifierModule.withConfig(notificationConfig),
    NgxSpinnerModule,
    AngularMaterialModule,
    FormsModule,
    CustomPipesModule
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : HeaderInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents : [ModalComponent, EditProfileModalComponent]
})
export class AppModule { }

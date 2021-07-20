import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { RedirectGuard } from './guards/redirect/redirect.guard';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [RedirectGuard]
  },
  {
    path : 'profile',
    component : ProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'boards',
    loadChildren : () => import('./components/boards/boards.module').then(m => m.BoardsModule),
    canLoad : [AuthGuard]
  },
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

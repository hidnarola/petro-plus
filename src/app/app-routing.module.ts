import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { AuthGuard } from './shared/auth.guard';
import { LoginGuard } from './shared/login.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./lending-layout/lending-layout.module').then(m => m.LendingLayoutModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'sign_in',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'sign_up',
    component: RegisterComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'forgot_password',
    component: ForgetPasswordComponent,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LendingLayoutComponent } from './lending-layout.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: LendingLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LendingLayoutRoutingModule { }

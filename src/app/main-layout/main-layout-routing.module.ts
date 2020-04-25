import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout.component';
import { ListSitesComponent } from './sites/list-sites/list-sites.component';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ReviewOrderComponent } from './orders/review-order/review-order.component';
import { TankDetailComponent } from './tanks/tank-detail/tank-detail.component';


const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'sites',
        component: ListSitesComponent
      },
      {
        path: 'orders',
        component: ListOrdersComponent
      },
      {
        path: 'orders/add',
        component: AddOrderComponent
      },
      {
        path: 'orders/review',
        component: ReviewOrderComponent
      },
      {
        path: 'tank/:site_id/:tank_id',
        component: TankDetailComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }

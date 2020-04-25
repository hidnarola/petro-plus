import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { MainLayoutComponent } from './main-layout.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { ListSitesComponent } from './sites/list-sites/list-sites.component';
import { ListOrdersComponent } from './orders/list-orders/list-orders.component';
import { AddOrderComponent } from './orders/add-order/add-order.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SidebarModule } from 'primeng/sidebar';
import { CalendarModule } from 'primeng/calendar';
import { ReviewOrderComponent } from './orders/review-order/review-order.component';
import { TankDetailComponent } from './tanks/tank-detail/tank-detail.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);

@NgModule({
  declarations: [
    MainLayoutComponent,
    DashboardHeaderComponent,
    ListSitesComponent,
    ListOrdersComponent,
    AddOrderComponent,
    ReviewOrderComponent,
    TankDetailComponent
  ],
  imports: [
    CommonModule,
    MainLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    DropdownModule,
    CalendarModule,
    FusionChartsModule
  ]
})
export class MainLayoutModule { }

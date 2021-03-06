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
import { GMapModule } from 'primeng/gmap';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReviewOrderComponent } from './orders/review-order/review-order.component';
import { TankDetailComponent } from './tanks/tank-detail/tank-detail.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';
import { SiteMapViewComponent } from './sites/site-map-view/site-map-view.component';
import { ZingchartAngularModule } from 'zingchart-angular';
import { CheckoutComponent } from './orders/checkout/checkout.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from 'src/environments/environment';
import { HammerModule } from '@angular/platform-browser';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { MapOptionsComponent } from './map-options/map-options.component';
import { MarkedSiteComponent } from './marked-site/marked-site.component';

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
    TankDetailComponent,
    OrderHistoryComponent,
    SiteMapViewComponent,
    CheckoutComponent,
    BottomSheetComponent,
    MapOptionsComponent,
    MarkedSiteComponent
  ],
  imports: [
    CommonModule,
    HammerModule,
    MainLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    DropdownModule,
    CalendarModule,
    InputSwitchModule,
    FusionChartsModule,
    ZingchartAngularModule,
    GMapModule,

    AgmCoreModule.forRoot({
      apiKey: environment.googleAPIKey
    })
  ]
})
export class MainLayoutModule { }

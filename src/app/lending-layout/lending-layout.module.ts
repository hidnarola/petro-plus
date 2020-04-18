import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LendingLayoutRoutingModule } from './lending-layout-routing.module';
import { LendingLayoutComponent } from './lending-layout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [LendingLayoutComponent, HomeComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    LendingLayoutRoutingModule
  ]
})
export class LendingLayoutModule { }

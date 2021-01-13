import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule }from '@swimlane/ngx-charts';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AddLocationComponent } from './shared/add-location/add-location.component';
import { LoginComponent } from './auth/login/login.component';
import { MainComponent } from './weather/main/main.component';
import { ChartsComponent } from './weather/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddLocationComponent,
    LoginComponent,
    MainComponent,
    ChartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

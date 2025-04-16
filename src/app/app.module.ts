import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceStatusComponent } from './components/device-status/device-status.component';
import { ProductionProgressComponent } from './components/production-progress/production-progress.component';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';
import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { ApiService } from './core/service/api.service';
import { ErrorService } from './core/service/error.service';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DeviceStatusComponent,
    ProductionProgressComponent,
    HistoricalDataComponent,
    ErrorHandlingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }

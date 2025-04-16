import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DeviceStatusComponent } from './components/device-status/device-status.component';

import { ErrorHandlingComponent } from './components/error-handling/error-handling.component';
import { ProductionProgressComponent } from './components/production-progress/production-progress.component';
import { HistoricalDataComponent } from './components/historical-data/historical-data.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'device-status', component: DeviceStatusComponent },
  { path: 'production-progress', component: ProductionProgressComponent },
  { path: 'historical-data', component: HistoricalDataComponent },
  { path: 'errors', component: ErrorHandlingComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

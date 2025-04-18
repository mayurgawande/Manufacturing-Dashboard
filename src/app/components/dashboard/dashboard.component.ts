import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';
import { ErrorService } from 'src/app/core/service/error.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  config: any;
  devices: any[] = [];
  selectedDevice!: string;
  deviceId: string | null = null;
  constructor(private apiService: ApiService, private errorService: ErrorService) {}

  ngOnInit(): void {
    this.apiService.getConfig().subscribe(
      (data:any) => {
        this.config = data;
      },
      (error:any) => {
        this.errorService.reportError('Failed to load configuration.');
      }
    );

    this.apiService.getDevices().subscribe(
      (data:any) => { 
        console.log("the device id is", data);
        const formattedResponse = data.map((item :any)=> ({ id: item }));
        this.devices = formattedResponse;
      },
      (error:any) => {
        this.errorService.reportError('Failed to load devices.');
      }
    );
  }

  selectDevice(event: Event): void {
    const selectedDeviceId = (event.target as HTMLSelectElement).value;
    this.deviceId = selectedDeviceId;
  }
}

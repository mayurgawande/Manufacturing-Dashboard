import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';


@Component({
  selector: 'app-device-status',
  templateUrl: './device-status.component.html',
  styleUrls: ['./device-status.component.scss']
})
export class DeviceStatusComponent implements OnChanges {
  @Input() deviceId!: string;
  deviceStatus!: string;

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['deviceId']) { debugger
      this.loadDeviceStatus();
    }
  }

  // loadDeviceStatus(): void {
  //   if (this.deviceId) {
  //     this.apiService.getEvents(this.deviceId).subscribe(
  //       (eventData:any) => { debugger
  //         this.deviceStatus = eventData.status;
  //         console.log("the device status is", this.deviceStatus);
  //       },
  //       (error:any) => {
  //         this.deviceStatus = 'Error loading status';
  //       }
  //     );
  //   }
  // }
  loadDeviceStatus(): void {
    if (this.deviceId) {
      this.apiService.getDeviceEvents(this.deviceId).subscribe(
        (eventData) => {
          this.deviceStatus = eventData.status;
          console.log("SSE Device Status:", this.deviceStatus);
        },
        (error) => {
          console.error("SSE Error:", error);
          this.deviceStatus = 'Error loading status';
        }
      );
    }
  }
  
}

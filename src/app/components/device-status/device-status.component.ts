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
    if (changes['deviceId']) { 
      this.loadDeviceStatus();
    }
  }
  loadDeviceStatus(): void {
    if (this.deviceId) {
      this.apiService.getDeviceEvents(this.deviceId).subscribe(
        (eventData) => {
          this.deviceStatus = eventData?.status || 'Unknown status';
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

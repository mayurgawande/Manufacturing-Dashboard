import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/service/api.service';


@Component({
  selector: 'app-production-progress',
  templateUrl: './production-progress.component.html',
  styleUrls: ['./production-progress.component.scss']
})
export class ProductionProgressComponent implements OnInit {
  @Input() deviceId!: string;
  productionProgress!: number;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void { 
    if (this.deviceId) {
      this.apiService.getDeviceEvents(this.deviceId).subscribe((data:any) => {
        this.productionProgress = data.partsPerMinute;
      });
    }
  }
}

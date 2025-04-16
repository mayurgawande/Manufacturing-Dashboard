import { Component, Input, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent implements OnInit, OnDestroy {
  @Input() deviceId!: string;
  historicalData: { timestamp: Date, partsPerMinute: number }[] = [];

  private sseSubscription!: Subscription;
  private svg: any;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private width = 600 - this.margin.left - this.margin.right;
  private height = 300 - this.margin.top - this.margin.bottom;

  constructor(
    private apiService: ApiService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.deviceId) {
      this.initChart();
      this.subscribeToEvents();
    }
  }

  subscribeToEvents(): void {
    this.sseSubscription = this.apiService.getDeviceEvents(this.deviceId).subscribe(
      (event: any) => {
        this.zone.run(() => {
          if (event && event.timestamp && event.partsPerMinute !== undefined) {
            const parsedEvent = {
              timestamp: new Date(event.timestamp),
              partsPerMinute: event.partsPerMinute
            };
            this.historicalData = [...this.historicalData, parsedEvent]; // trigger change detection
            this.updateChart();
            this.cd.detectChanges(); // ensure Angular knows about the change
          }
        });
      },
      (error) => {
        console.error('Error receiving SSE data:', error);
      }
    );
  }

  initChart(): void {
    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
  }

  updateChart(): void {
    // Clear previous content
    this.svg.selectAll('*').remove();

    if (this.historicalData.length === 0) return;

    const x = d3.scaleTime()
      .domain(d3.extent(this.historicalData, d => d.timestamp) as [Date, Date])
      .range([0, this.width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(this.historicalData, d => d.partsPerMinute) || 0])
      .nice()
      .range([this.height, 0]);

    const line = d3.line<{ timestamp: Date, partsPerMinute: number }>()
      .x(d => x(d.timestamp))
      .y(d => y(d.partsPerMinute));

    this.svg.append('g')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(x));

    this.svg.append('g')
      .call(d3.axisLeft(y));

    this.svg.append('path')
      .datum(this.historicalData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }

  ngOnDestroy(): void {
    if (this.sseSubscription) {
      this.sseSubscription.unsubscribe();
    }
  }
}

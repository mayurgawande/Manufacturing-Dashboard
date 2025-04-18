import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/service/api.service';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.scss']
})
export class HistoricalDataComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() deviceId!: string;
  @ViewChild('chartContainer', { static: false }) chartContainer!: ElementRef;

  historicalData: { timestamp: Date; partsPerMinute: number }[] = [];
  private sseSubscription!: Subscription;
  private svg: any;
  private margin = { top: 20, right: 30, bottom: 30, left: 40 };
  private width = 600;
  private height = 300;

  constructor(
    private apiService: ApiService,
    private zone: NgZone,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Move SSE subscription to ngAfterViewInit to avoid chartContainer being undefined
  }

  ngAfterViewInit(): void {
    if (this.chartContainer) {
      this.initChart();
      if (this.deviceId) {
        this.subscribeToEvents(); // Now safe to start streaming + chart ready
      }
    } else {
      console.warn('chartContainer not found, retrying...');
      setTimeout(() => this.ngAfterViewInit(), 50); // Retry after slight delay
    }
  }

  subscribeToEvents(): void {
    this.sseSubscription = this.apiService.getDeviceEvents(this.deviceId).subscribe(
      (event: any) => {
        this.zone.run(() => {
          const data = {
            timestamp: new Date(event.timestamp),
            partsPerMinute: event.partsPerMinute
          };
          this.historicalData.push(data);
          this.updateChart();
          this.cd.detectChanges();
        });
      },
      (error) => console.error('SSE error:', error)
    );
  }

  initChart(): void {
    const element = this.chartContainer?.nativeElement;
    if (!element) {
      console.error('Chart container element not found');
      return;
    }

    this.svg = d3
      .select(element)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  updateChart(): void {
    if (!this.svg || this.historicalData.length === 0) return;

    this.svg.selectAll('*').remove();

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    const x = d3
      .scaleTime()
      .domain(d3.extent(this.historicalData, (d) => d.timestamp) as [Date, Date])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.historicalData, (d) => d.partsPerMinute) || 100])
      .range([height, 0]);

    const line = d3
      .line<{ timestamp: Date; partsPerMinute: number }>()
      .x((d) => x(d.timestamp))
      .y((d) => y(d.partsPerMinute));

    this.svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(5));

    this.svg.append('g').call(d3.axisLeft(y));

    this.svg
      .append('path')
      .datum(this.historicalData)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2)
      .attr('d', line);
  }

  ngOnDestroy(): void {
    this.sseSubscription?.unsubscribe();
  }
}

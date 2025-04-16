import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://mock-api.assessment.sfsdm.org';

  constructor(private http: HttpClient) {}

  getConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}/config`);
  }

  getDevices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/devices`);
  }

  // getEvents(deviceId: string): Observable<any> {debugger
  //   return this.http.get(`${this.baseUrl}/events/${deviceId}`);
  // }
  getDeviceEvents(deviceId: string): Observable<any> {
    return new Observable((observer) => {
      const eventSource = new EventSource(`https://mock-api.assessment.sfsdm.org/events/${deviceId}`);

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          observer.next(data);
        } catch (error) {
          observer.error('Failed to parse SSE data');
        }
      };

      eventSource.onerror = (error) => {
        observer.error(error);
        eventSource.close();
      };

      // Cleanup on unsubscribe
      return () => {
        eventSource.close();
      };
    });
  }

  getOrder(orderId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/order/${orderId}`);
  }
}

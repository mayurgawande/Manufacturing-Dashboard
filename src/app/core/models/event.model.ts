export interface DeviceEvent {
    timestamp: Date;
    message: string;
    type: 'INFO' | 'WARNING' | 'ERROR';
    partsProduced?: number;
  }
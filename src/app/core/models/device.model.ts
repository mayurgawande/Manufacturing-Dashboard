export interface Device {
    id: string;
    name: string;
    status: 'RUNNING' | 'STOPPED' | 'ERROR';
    environment: 'DEV' | 'TEST' | 'PROD';
    partsPerMinute: number[];
    partsProduced: number[];
    interrupts: string[];
    
  }
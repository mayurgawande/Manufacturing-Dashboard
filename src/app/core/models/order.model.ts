export interface Order {
    orderId: string;
    progress: number; // percentage from 0 to 100
    totalParts: number;
    partsProduced: number;
  }
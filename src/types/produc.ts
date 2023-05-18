import { Document } from 'mongoose';
export type Sizes = 'S' | 'M' | 'L' | 'XL';
export interface IProduct extends Document {
  id: number;
  title: string;
  local_id: string;
  for_unsubscribing: Number;
  discharged: Number;
  stock_store: Number;
  stock_showcase: Number;
  image: string;
  description: string;
  stock: number;
  size?: string;
  color: string;
  price: number;
  category: string;
  isNew: boolean;
  tags: string[];
  sold: number;
  dateSold?: Date;
  expirationDate: Date;
  expirationDates: IExpirationDate[];
  presentation: string;
  sku: string;
  unitOfMeasure: string
  barcode: number;
}

interface IExpirationDate {
  date: Date;
  isClosed: boolean;
}
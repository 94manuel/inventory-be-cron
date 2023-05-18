import mongoose, { Schema } from 'mongoose';
import {IProduct} from "../types/produc";

const expirationDateSchema: Schema = new Schema({
    date: { type: Date },
    amount: { type: Number },
    isClosed: { type: Boolean },
});

const productSchema: Schema = new Schema({
    title: { type: String },
    local_id: { type: String },
    price: { type: Number },
    expirationDate: { type: Date },
    expirationDates: [expirationDateSchema],
    presentation: { type: String },
    sku: { type: String },
    sold: { type: Number },
    stock: { type: Number},
    for_unsubscribing: {type: Number},
    discharged: {type: Number},
    stock_store: {type: Number},
    stock_showcase: {type: Number},
    category: { type: String },
    unitOfMeasure: { type: Number},
    barcode: { type: String, unique: true },
});

export default mongoose.model<IProduct>('inventarios', productSchema);
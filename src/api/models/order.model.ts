import { ObjectId } from "mongodb";
import mongoose, { Schema, Document } from "mongoose"
import { OrderStatus } from "../../constants/enum";
import { IDepot } from "./depot.model";
export interface IOrder extends Document {
  claimPhoto: String;
  client: String;
  deliveryMan: String;
  depot: ObjectId | IDepot;
  article: String;
  livraison: String;
  status: String;
  startDate: Date;
  endDate: Date;
  destination: String;
  title: String;
  totalPrice: number;
  verificationId: String;
}
const OrderSchema: Schema = new Schema({
  title: {
    type: String
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deliveryMan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  depot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Depot'
  },
  article: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  },
  livraison: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Livraison'
  },
  status: {
    type: OrderStatus,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number
  },
  informationsSupp: {
    type: String
  },
  claimPhoto: {
    type: String
  },
  qrCode: {
    type: String
  },
  verificationId: {
    type: String
  }

})
export default mongoose.model<IOrder>("Order", OrderSchema)
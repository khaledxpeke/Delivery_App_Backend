import mongoose, { Schema, Document, SchemaTypeOptions, ObjectId } from "mongoose"
import { IDepot } from "./depot.model";
export interface IHistory extends Document {
  name: String;
  image: String;
  orderDestination: String;
  client: String;
  deliveryMan: String;
  depot: ObjectId | IDepot;
  depotDestination: String;
  note: String;
}
const HistorySchema: Schema = new Schema({
  title: {
    type: String
  },
  deliveryMan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  depot: {
    type: String,
  },
  image: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  orderDestination: {
    type: String,
  },
  depotDestination: {
    type: String,
  },
  note: {
    type: String
  },
})
export default mongoose.model<IHistory>("History", HistorySchema)
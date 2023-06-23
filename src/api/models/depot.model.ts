import mongoose, { Schema, Document, SchemaTypeOptions } from "mongoose"
import { OrderStatus } from "../../constants/enum";
export interface IDepot extends Document {
  name: String;
  image: String;
  address: String;
  phone: String;
  orders?: any[]
}
const DepotSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String
  },
  status: {
    type: OrderStatus
  },

  informationsSupp: {
    type: String
  },
  phone: {
    type: String
  },

})
export default mongoose.model<IDepot>("Depot", DepotSchema)
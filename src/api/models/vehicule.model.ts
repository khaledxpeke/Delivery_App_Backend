import mongoose, { Schema, Document } from "mongoose"
export interface IVehicule {
  name: String;
  model: String;
  color: String;
  image: String;
  registrationNumber: String;
}
const VehiculeSchema: Schema = new Schema({
  name: {
    type: String,
  },
  model: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  color: {
    type: String,
  },
  registrationNumber: {
    type: String,
  },
})
export default mongoose.model<IVehicule>("Vehicule", VehiculeSchema)
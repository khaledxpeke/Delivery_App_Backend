import mongoose, { Schema, Document } from "mongoose"
export interface ILivraison extends Document {
  code: String;
  image1: String;
  image2: String;
  image3: String;
}
const LivraisonSchema: Schema = new Schema({
  code: {
    type: String,
    required: true,
  },
  image1: {
    type: String,
    required: true,
  },
  image2: {
    type: String,
    required: true,
  },
  image3: {
    type: String,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
})
export default mongoose.model<ILivraison>("Livraison", LivraisonSchema)
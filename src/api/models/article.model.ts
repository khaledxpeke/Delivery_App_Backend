import mongoose, { Schema, Document } from "mongoose"
export interface IArticle extends Document {
  weight: Number;
  type: String;
  volume: number;
  reference: String
}
const ArticleSchema: Schema = new Schema({
  weight: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  volume: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
    required: true,
  },
})
export default mongoose.model<IArticle>("Article", ArticleSchema)
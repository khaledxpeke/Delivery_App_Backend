import mongoose, { Schema } from 'mongoose';
import { Roles } from '../../constants/enum';
import { IVehicule } from './vehicule.model';

interface UserType extends mongoose.Document {
  name: string;
  email: string;
  lastname: string;
  image: String;
  password: string;
  code: string;
  address: string;
  vehicule: IVehicule;
  phone: String;
  msg: String;
  platform: String;
  escalier: boolean;
  ascenseur: boolean;
  parking: boolean;
  etage: number;
  port: number;
}

const UserSchema = new mongoose.Schema<UserType>({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: Roles,
  },
  code: {
    type: String,
    required: true
  },
  vehicule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicule"
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  informationsSupp: {
    type: String
  },
  platform: {
    type: String,
  },
  escalier: {
    type: Boolean,
  },
  ascenseur: {
    type: Boolean,
  },
  parking: {
    type: Boolean,
  },
  etage: {
    type: Number,
  },
  port: {
    type: Number,
  },
});


export default mongoose.model<UserType>('User', UserSchema);
import { Controller, Delete, Get, Post, Route, Tags } from "tsoa";
import vehiculeModel from "../models/vehicule.model";
@Route("/vehicule")
@Tags("vehicule")
export class VehiculeController extends Controller {

  async addVehicule(data: any): Promise<any> {
    const result = await vehiculeModel.create(data);
    return {
      error: null,
      data: result,
    };
  }
  @Delete('/{id}')
  async deleteVehicule(id: any): Promise<any> {
    const result = await vehiculeModel.findByIdAndDelete(id);
    return {
      error: null,
      data: result,
    };
  }
  @Get('/')
  async getAllVehicules(): Promise<any> {
    const result = await vehiculeModel.find({});
    return {
      error: null,
      data: result,
    };
  }
  @Get('/{id}')
  async getVehiculeById(id: any): Promise<any> {
    const result = await vehiculeModel.findById(id);
    return {
      error: null,
      data: result,
    };
  }


  async updateVehicule(id: any, newName: any, newModel: any, newRegistrationNumber: any, newImage: any, newColor: any): Promise<any> {
    const vehId = await vehiculeModel.findOne({
      _id: id,
    });
    const filter = { _id: vehId };
    const update = { name: newName, model: newModel, registrationNumber: newRegistrationNumber, image: newImage, color: newColor };
    let vehicule = await vehiculeModel.findById(vehId);
    const result = await vehiculeModel.updateOne(filter, update, {
    })
    if (vehicule) {
      vehicule.name = newName,
        vehicule.model = newModel,
        vehicule.registrationNumber = newRegistrationNumber,
        vehicule.image = newImage,
        vehicule.color = newColor,
        await vehicule?.save();
    }
    return {
      error: null,
      data: result
    };
  }

}
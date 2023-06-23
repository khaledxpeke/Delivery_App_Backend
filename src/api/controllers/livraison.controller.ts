import livraisonModel from "../models/livraison.model";
import { Controller, Delete, Get, Post, Route, Tags } from "tsoa";

@Route("/livraison")
@Tags("Livraison")
export class LivraisonController extends Controller {

  async addLivraison(data: any): Promise<any> {
    const result = await livraisonModel.create(data);
    return {
      error: null,
      data: result,
    };
  }

  @Delete('/{id}')
  async deleteLivraison(id: any): Promise<any> {
    const result = await livraisonModel.findByIdAndDelete(id);
    return {
      error: null,
      data: result,
    };
  }
  @Get('/')
  async getAllLivraison(): Promise<any> {
    const result = await livraisonModel.find({});
    return {
      error: null,
      data: result,
    };

  }
  @Get('/{id}')
  async getLivraisonById(id: any): Promise<any> {
    const result = await livraisonModel.findById(id);
    return {
      error: null,
      data: result,
    };
  }


}

import { Controller, Delete, Get, Post, Route, Tags } from "tsoa";
import mongoose, { Schema, Document } from "mongoose"
import historyModel from "../models/history.model";
import orderModel from "../models/order.model";


@Route("/history")
@Tags("History")
export default class HistoryController extends Controller {

  async addHistory(data: any): Promise<any> {
    const result = await historyModel.create(data);
    return {
      error: null,
      data: result,
    };
  }

  @Get('/')
  async getOrdersHistory(): Promise<any> {
    const history = await historyModel.find({}).exec();
    return {
      error: null,
      data: history
    };
  }


  @Get('/{id}')
  async getOrderById(id: any) {
    const result = await historyModel.findById(id)
    return {
      error: null,
      data: result,
    };
  }

}
import { Controller, Delete, Get, Post, Route, Tags } from "tsoa";
import orderModel from "../models/order.model";
import mongoose, { Schema, Document } from "mongoose"
@Route("/order")
@Tags("Orders")
export default class OrderController extends Controller {
  async addOrder(data: any) {
    const result = await orderModel.create(data);
    return {
      error: null,
      data: result,
    };
  }

  async addPicture(orderID: any, photo: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { status: 'CLAIMED', claimPhoto: photo };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.updateOne(filter, update, {
    })
    if (order) {
      order.status = 'CLAIMED';
      order.claimPhoto = photo
      await order?.save();
    }
    return {
      error: null,
      data: result
    };
  }
  async claimOrder(orderID: any, photo: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { status: 'CLAIMED', claimPhoto: photo };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.updateOne(filter, update, {
    })
    if (order) {
      order.status = 'CLAIMED';
      order.claimPhoto = photo
      await order?.save();
    }
    return {
      error: null,
      data: result
    };
  }
  async addVerificationId(orderID: any, verifId: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { verificationId: verifId };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.updateOne(filter, update, {
    })
    if (order) {
      order.verificationId = verifId;
      await order?.save();
    }
    return {
      error: null,
      data: result
    };
  }

  async addLivraisonId(orderID: any, livraisonID: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { livraison: livraisonID };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.updateOne(filter, update, {
    })
    if (order) {
      order.livraison = livraisonID;
      await order?.save();
    }
    return {
      error: null,
      data: result
    };
  }
  @Delete('/{id}')
  async deleteOrder(id: any) {
    const result = await orderModel.findByIdAndDelete(id);
    return {
      error: null,
      data: result,
    };
  }
  @Get('/')
  async getAllOrders() {
    const result = await orderModel.find({
    }).populate('deliveryMan').populate('deliveryMan.vehicule').populate('client').populate('article').populate('livraison').populate('depot').exec();
    return {
      error: null,
      data: result,
      // count : result.length

    };
  }

  @Get('/order/{userId}') async getOrderByDeliveryMan(userId: any): Promise<any> {
    const id = mongoose.Types.ObjectId(userId);
    console.log(id)
    const result = await orderModel.find({}).populate({
      path: "order",
      match: {
        _id: id
      }
    }).populate('deliveryMan').populate('deliveryMan.vehicule').populate('client').populate('article').exec();
    return {
      l: result.length,
      error: null,
      data: result
    };
  }


  @Get('/{id}')
  async getOrderById(id: any) {
    const result = await orderModel.findById(id)
    return {
      error: null,
      data: result,
    };
  }
  @Get('/depot/{depotID}')
  async getOrdersByDepot(depotID: any): Promise<any> {

    const id = mongoose.Types.ObjectId(depotID);

    const result = await orderModel.find({}).populate({
      path: "depot",
      match: {
        _id: id
      }
    })
    return {
      l: result.length,
      error: null,
      data: result
    };
  }

  @Get('/accept/{orderID}')
  async acceptOrder(orderID: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { status: 'ACCEPTED' };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.findOneAndUpdate(filter, update, {
    })
    if (order) {
      order.status = 'ACCEPTED';
      await order?.save();
    }
    return {
      error: null,
      data: order
    };
  }
  @Post('/refuse/{orderID}')
  async refuseOrder(orderID: any): Promise<any> {

    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { status: 'REFUSED' };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.findOneAndUpdate(filter, update, {
    })
    if (order) {
      order.status = 'REFUSED';
      await order?.save();
    }
    return {
      error: null,
      data: order
    };
  }

  @Post('/close/{orderID}')
  async closeOrder(orderID: any): Promise<any> {

    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { status: 'CLOSED' };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.findOneAndUpdate(filter, update, {
    })
    if (order) {
      order.status = 'CLOSED';
      await order?.save();
    }
    return {
      error: null,
      data: order
    };
  }
  async setOrder(orderID: any, status: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { status: status };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.findOneAndUpdate(filter, update, {
    })
    if (order) {
      await order?.save();
    }
    return {
      error: null,
      data: order
    };
  }
  async scanOrder(orderID: any, data: any): Promise<any> {
    const id = mongoose.Types.ObjectId(orderID);
    const filter = { _id: id };
    const update = { qrCode: data, status: 'LOADED' };
    let order = await orderModel.findById(orderID);
    const result = await orderModel.findOneAndUpdate(filter, update, {
    })
    if (order) {
      await order?.save();
    }
    return {
      error: null,
      data: order
    };
  }

}







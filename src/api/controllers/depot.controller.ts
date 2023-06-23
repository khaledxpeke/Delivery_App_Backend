import { Controller, Delete, Get, Route, Tags } from 'tsoa';
import depotModel from '../models/depot.model';
import orderModel from '../models/order.model';
import mongoose, { Schema, Document } from 'mongoose';
const Moment = require('moment');

Moment.locale('fr');
console.log(Moment.locale());
@Route('/depot')
@Tags('Depots')
export default class DepotController extends Controller {
  async addDepot(data: any): Promise<any> {
    const result = await depotModel.create(data);
    return {
      error: null,
      data: result,
    };
  }
  @Delete('/{id}')
  async deleteDepot(id: any): Promise<any> {
    const result = await depotModel.findByIdAndDelete(id);
    return {
      error: null,
      data: result,
    };
  }
  @Get('/')
  async getAllDepots(): Promise<any> {
    const depots = await depotModel.find({});
    const res = await Promise.all(
      depots.map(async (item) => {
        delete item.orders;
        const orders = await orderModel
          .find({
            depot: item._id,
          })
          .populate('client')
          .populate('article')
          .populate('livraison');
        return {
          depot: item,
          orders,
        };
      }),
    );

    return {
      error: null,
      data: res,
    };
  }
  async calendar(userId: any): Promise<any> {
    let filter: any;
    let now = Moment();
    let tomorrow = Moment()
      .set('hour', 21)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0);
    console.log(tomorrow.endOf('day').toDate());
    if (now.isBefore(tomorrow)) {
      filter = {
        startDate: {
          $gte: now.startOf('day').toDate(),
          $lte: tomorrow.toDate(),
        },
        deliveryMan:userId
        
        // status: 'ACCEPTED'
      };
    } else {
      filter = {
        startDate: {
          $gte: tomorrow.toDate(),
          $lte: tomorrow.endOf('day').toDate(),
        },
        deliveryMan:userId
        // status : ['CONFIRMED','REFUSED']
      };
    }

    const orders = await orderModel
      .find(filter)
      .populate('client')
      .populate('depot')
      .populate('article');

    return {
      error: null,
      data: orders,
    };
  }
  @Get('/{id}')
  async getDepotById(id: any): Promise<any> {
    const result = await depotModel.findById(id);
    return {
      error: null,
      data: result,
    };
  }

  async setDepotStatus(depotID: any, status: any): Promise<any> {
    const id = mongoose.Types.ObjectId(depotID);
    const filter = { _id: id };
    const update = { status: status };
    let depot = await depotModel.findById(depotID);
    const result = await depotModel.findOneAndUpdate(filter, update, {});
    if (depot) {
      await depot?.save();
    }
    return {
      error: null,
      data: depot,
    };
  }
  async getAllDepotsByDeliveryMan(userId: any): Promise<any> {
    const depots = await depotModel.find({});
    const filter2 = { status: 'CLAIMED' };
    const update = { status: 'CLAIMED' };
    await orderModel.updateMany(filter2,update, {});
    let filter: any;
    filter = [
      'ACCEPTED',
      'CLAIMED',
      'LOADED',
      'CONFIRMED',
      'IN_PROGRESS',
      'ARRIVED',
    ];

    const res = await Promise.all(
      depots.map(async (item) => {
        delete item.orders;
        const orders = await orderModel
          .find({
            status: filter,
            depot: item._id,
            deliveryMan: userId,
          })
          .populate('client')
          .populate('article')
        return {
          depot: item,
          orders,
        };
      }),
    );
    return {
      error: null,
      data: res,
    };
  }
}

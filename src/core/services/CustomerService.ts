import ApiError from '../exceptions/ApiError';
import {
  IDbCustomer,
  ICustomerData,
  ICustomerParams,
  ICustomerSearchFields,
} from '../interfaces/ICustomer';
import CustomerModel from '../models/CustomerModel';
import { Schema } from 'mongoose';
import { PaginationModel } from 'mongoose-paginate-ts';
import ScoreService from './ScoreService';
import ScoreModel from '../models/ScoreModel';

class CustomerService {
  async addCustomerPoints(id: string, points: number): Promise<void> {
    const customer = await CustomerModel.findById(id);

    if (!customer) {
      throw new ApiError(404, 'customer not found');
    }

    if (!customer.participatePointsProgram) {
      throw new ApiError(400, 'customer does not participate points program');
    }

    const score = await ScoreService.getScoreByCustomer(id);

    if (!score) {
      throw new ApiError(404, 'customer score not found');
    }

    await ScoreService.increasePoints(score._id, points);
  }

  async create(data: ICustomerData): Promise<IDbCustomer> {
    await this.customerDataValidation(data);

    const customer = await CustomerModel.create(data);

    if (data.participatePointsProgram) {
      await ScoreService.create({
        points: 0,
        customer: customer._id,
      });
    }

    return customer;
  }

  async update(id: string, data: ICustomerData): Promise<IDbCustomer> {
    await this.customerDataValidation(data, id);

    const customer = await CustomerModel.findByIdAndUpdate(id, data);

    if (!customer) {
      throw new ApiError(404, 'customer not found');
    }

    const score = await ScoreModel.findOne({ customer: customer._id });

    if (data.participatePointsProgram) {
      if (!score) {
        await ScoreService.create({
          points: 0,
          customer: customer._id,
        });
      }
    } else {
      if (score) {
        await ScoreService.delete(score._id);
      }
    }

    return customer;
  }

  async list(data: ICustomerParams): Promise<PaginationModel<IDbCustomer>> {
    const { fullName, doc, email, page, limit, sort } = data;

    const payload: ICustomerSearchFields = {};

    if (doc) {
      payload['doc.id'] = doc;
    }

    if (email) {
      payload['contact.email'] = email;
    }

    if (fullName) {
      payload.fullName = { $regex: new RegExp(fullName, 'i') };
    }

    const options = {
      query: payload,
      sort: { createdAt: sort },
      page,
      limit,
    };

    const results = await CustomerModel.paginate(options);

    if (!results) {
      return {} as PaginationModel<IDbCustomer>;
    }

    return results;
  }

  async show(id: string | Schema.Types.ObjectId): Promise<IDbCustomer> {
    const customer = await CustomerModel.findById(id);

    if (!customer) {
      throw new ApiError(404, 'customer not found');
    }

    return customer;
  }

  async delete(id: string | Schema.Types.ObjectId): Promise<IDbCustomer> {
    const customer = await CustomerModel.findByIdAndDelete(id);

    if (!customer) {
      throw new ApiError(404, 'customer not found');
    }

    return customer;
  }

  private async customerDataValidation(data: ICustomerData, id: string = ''): Promise<void> {
    const { doc, contact } = data;

    const findByDoc = await CustomerModel.findOne({ 'doc.id': doc.id });
    const findByEmail = await CustomerModel.findOne({ 'contact.email': contact.email });

    if (findByDoc && (id ? findByDoc._id.toString() !== id : true)) {
      throw new ApiError(400, `Documento "${doc.id}" já está em uso`);
    }

    if (findByEmail && (id ? findByEmail._id.toString() !== id : true)) {
      throw new ApiError(400, `E-mail de cliente "${contact.email}" já está em uso`);
    }
  }
}

export default new CustomerService();

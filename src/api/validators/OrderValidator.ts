import * as Yup from 'yup';
import { REGEX_OBJECT_ID } from '../../core/constants/regex';
import ApiError from '../../core/exceptions/ApiError';
import { Request } from 'express';

class OrderValidator {
  async create(req: Request) {
    const schema = Yup.object({
      value: Yup.object({
        totalItems: Yup.number().required(),
        totalDiscount: Yup.number().optional().default(0.0),
        delivery: Yup.number().required(),
        total: Yup.number().required(),
      }).required(),
      discountPercentage: Yup.number().optional().default(0.0),
      paymentType: Yup.string().required(),
      date: Yup.object({
        delivery: Yup.date().required(),
        payment: Yup.date().required(),
      }).required(),
      seller: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'seller must be a ObjectId')
        .required(),
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
        .required(),
      items: Yup.array()
        .of(
          Yup.object({
            quantity: Yup.number().integer().required(),
            value: Yup.object({
              unitary: Yup.number().required(),
              subtotal: Yup.number().required(),
            }).required(),
            product: Yup.string()
              .matches(new RegExp(REGEX_OBJECT_ID), 'product must be a ObjectId')
              .required(),
          })
        )
        .required(),
    });

    return schema.validate(req.body).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async update(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'id must be a ObjectId').required(),
      value: Yup.object({
        totalItems: Yup.number().required(),
        totalDiscount: Yup.number().optional().default(0),
        delivery: Yup.number().required(),
        total: Yup.number().required(),
      }).required(),
      discountPercentage: Yup.number().optional().default(0.0),
      paymentType: Yup.string().required(),
      date: Yup.object({
        delivery: Yup.date().required(),
        payment: Yup.date().required(),
      }).required(),
      status: Yup.string().required(),
      seller: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'seller must be a ObjectId')
        .required(),
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
        .required(),
      items: Yup.array()
        .of(
          Yup.object({
            quantity: Yup.number().integer().required(),
            value: Yup.object({
              unitary: Yup.number().required(),
              subtotal: Yup.number().required(),
            }).required(),
            product: Yup.string()
              .matches(new RegExp(REGEX_OBJECT_ID), 'product must be a ObjectId')
              .required(),
          })
        )
        .required(),
    });

    return schema.validate({ ...req.body, ...req.params }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async list(req: Request) {
    const schema = Yup.object({
      cod: Yup.number().integer().optional(),
      customer: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'customer must be a ObjectId')
        .optional(),
      seller: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'seller must be a ObjectId')
        .optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
      sort: Yup.string().oneOf(['asc', 'desc']).default('desc'),
    });

    return schema.validate(req.query).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async addItem(req: Request) {
    const schema = Yup.object({
      quantity: Yup.number().integer().required(),
      value: Yup.object({
        unitary: Yup.number().required(),
        subtotal: Yup.number().required(),
      }).required(),
      product: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'product must be a ObjectId')
        .required(),
      order: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'order must be a ObjectId')
        .required(),
    });

    return schema.validate({ ...req.body, order: req.params.id }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }

  async updateItem(req: Request) {
    const schema = Yup.object({
      id: Yup.string().matches(new RegExp(REGEX_OBJECT_ID), 'itemId must be a ObjectId').required(),
      quantity: Yup.number().integer().required(),
      value: Yup.object({
        unitary: Yup.number().required(),
        subtotal: Yup.number().required(),
      }).required(),
      product: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'product must be a ObjectId')
        .required(),
      order: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'order must be a ObjectId')
        .required(),
    });

    return schema
      .validate({ ...req.body, id: req.params.itemId, order: req.params.id })
      .catch(err => {
        throw new ApiError(400, err.message);
      });
  }

  async listItems(req: Request) {
    const schema = Yup.object({
      order: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'order must be a ObjectId')
        .required(),
      product: Yup.string()
        .matches(new RegExp(REGEX_OBJECT_ID), 'product must be a ObjectId')
        .optional(),
      page: Yup.number().integer().default(1),
      limit: Yup.number().integer().default(10),
      sort: Yup.string().oneOf(['asc', 'desc']).default('desc'),
    });

    return schema.validate({ ...req.query, order: req.params.id }).catch(err => {
      throw new ApiError(400, err.message);
    });
  }
}

export default new OrderValidator();

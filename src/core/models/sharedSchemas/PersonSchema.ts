import mongoose from '../../support/database/mongo';

const DocDocumentSchema = {
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['F', 'J'],
    required: true,
  },
};

const ContactDocumentSchema = {
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  cel: {
    type: String,
    required: false,
  },
};

const AddressDocumentSchema = {
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  complement: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
};

const PersonSchema = {
  fullName: {
    type: String,
    required: true,
  },
  doc: DocDocumentSchema,
  contact: ContactDocumentSchema,
  address: AddressDocumentSchema,
};

export default PersonSchema;

import { Schema, model } from 'mongoose';

const storesNearestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const NearestStore = model('pharmacies', storesNearestSchema);

export const Store = model('pharma', storesNearestSchema);

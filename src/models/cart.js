import { model, Schema } from 'mongoose';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    isOrdered: {
      type: Boolean,
      default: false,
    },
    payment: {
      type: String,
      enum: ['cash', 'bank'],
    },
    name: String,
    email: {
      type: String,
      match: emailRegex,
    },
    phone: String,
    address: String,
    total: String,
  },
  { versionKey: false, timestamps: true },
);
export const Cart = model('Cart', cartSchema, 'cartCollection');

import { model, Schema } from 'mongoose';

const reviewsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    testimonial: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);
export const Reviews = model('reviews', reviewsSchema);

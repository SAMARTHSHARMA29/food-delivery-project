import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  rating: { type: Number, default: 4.5 },
  reviewsCount: { type: Number, default: 0 },
  deliveryTime: { type: String, default: "20-30 min" },
  deliveryFee: { type: Number, default: 1.99 },
  minOrder: { type: Number, default: 10.00 },
  cuisines: [{ type: String }],
  image: { type: String, required: true },
  badge: { type: String },
  priceRange: { type: String, default: "$$" },
  address: { type: String },
  description: { type: String }
}, { timestamps: true });

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);

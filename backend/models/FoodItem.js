import mongoose from 'mongoose';

const addonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }
});

const foodItemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  restaurantId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 4.8 },
  prepTime: { type: String, default: "15 mins" },
  calories: { type: String },
  image: { type: String, required: true },
  description: { type: String },
  isPopular: { type: Boolean, default: false },
  isVeg: { type: Boolean, default: false },
  addons: [addonSchema]
}, { timestamps: true });

export const FoodItem = mongoose.model('FoodItem', foodItemSchema);

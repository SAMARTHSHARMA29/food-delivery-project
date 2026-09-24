import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  foodId: String,
  name: String,
  price: Number,
  quantity: Number,
  selectedAddons: [{ name: String, price: Number }],
  itemTotal: Number
});

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  phone: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  items: [orderItemSchema],
  restaurantId: { type: String },
  restaurantName: { type: String },
  subtotal: Number,
  deliveryFee: Number,
  tax: Number,
  discount: Number,
  total: Number,
  paymentMethod: { type: String, default: "Card" },
  status: { 
    type: String, 
    enum: ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Received'
  },
  estimatedDeliveryTime: { type: String, default: '25-35 mins' },
  driverName: { type: String, default: 'Alex Rivers' },
  driverPhone: { type: String, default: '+1 (555) 019-2834' }
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);

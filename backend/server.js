import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { categories, restaurants as initialRestaurants, foodItems as initialFoodItems, promoCodes } from './data/initialData.js';
import { Restaurant } from './models/Restaurant.js';
import { FoodItem } from './models/FoodItem.js';
import { Order } from './models/Order.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Fallback DB Store when MongoDB local is unavailable
let isMongoConnected = false;
let memoryRestaurants = [...initialRestaurants];
let memoryFoodItems = [...initialFoodItems];
let memoryOrders = [
  {
    orderId: "ORD-9821",
    customerName: "Samarth Patel",
    phone: "+1 555-014-9988",
    deliveryAddress: "742 Evergreen Terrace, Apt 4B",
    restaurantId: "rest-1",
    restaurantName: "Crave Craft Burgers",
    items: [
      { foodId: "food-101", name: "The Truffle Monster Burger", price: 14.99, quantity: 2, selectedAddons: [{ name: "Extra Smoked Bacon", price: 2.50 }], itemTotal: 34.98 }
    ],
    subtotal: 34.98,
    deliveryFee: 1.99,
    tax: 2.80,
    discount: 5.00,
    total: 34.77,
    paymentMethod: "Credit Card",
    status: "Preparing",
    estimatedDeliveryTime: "18 mins",
    driverName: "Alex Rivers",
    driverPhone: "+1 (555) 019-2834",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString()
  }
];

// Database Connection Attempt
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/food_delivery";
  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 3000 });
    isMongoConnected = true;
    console.log("⚡ [MongoDB] Successfully connected to MongoDB database!");

    // Seed database if empty
    const restCount = await Restaurant.countDocuments();
    if (restCount === 0) {
      await Restaurant.insertMany(initialRestaurants);
      await FoodItem.insertMany(initialFoodItems);
      console.log("🌱 [MongoDB] Initialized seed data successfully!");
    }
  } catch (err) {
    isMongoConnected = false;
    console.warn("⚠️ [MongoDB] Local Mongo Server not detected. Running seamlessly in High-Speed In-Memory DB Mode!");
  }
};

connectDB();

// API ROUTES

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    databaseMode: isMongoConnected ? 'MongoDB Connected' : 'In-Memory DB Active',
    timestamp: new Date().toISOString()
  });
});

// 2. Categories
app.get('/api/categories', (req, res) => {
  res.json({ success: true, data: categories });
});

// 3. Restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const { search, cuisine, sortBy } = req.query;
    let list = [];

    if (isMongoConnected) {
      let query = {};
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { cuisines: { $regex: search, $options: 'i' } }
        ];
      }
      if (cuisine && cuisine !== 'all') {
        query.cuisines = { $regex: cuisine, $options: 'i' };
      }
      let sort = {};
      if (sortBy === 'rating') sort = { rating: -1 };
      else if (sortBy === 'fee') sort = { deliveryFee: 1 };
      
      list = await Restaurant.find(query).sort(sort);
    } else {
      list = memoryRestaurants.filter(r => {
        const matchesSearch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.cuisines.some(c => c.toLowerCase().includes(search.toLowerCase()));
        const matchesCuisine = !cuisine || cuisine === 'all' || r.cuisines.some(c => c.toLowerCase().includes(cuisine.toLowerCase()));
        return matchesSearch && matchesCuisine;
      });

      if (sortBy === 'rating') {
        list.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === 'fee') {
        list.sort((a, b) => a.deliveryFee - b.deliveryFee);
      }
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 4. Restaurant Detail with Menu
app.get('/api/restaurants/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let restaurant = null;
    let items = [];

    if (isMongoConnected) {
      restaurant = await Restaurant.findOne({ id });
      if (restaurant) {
        items = await FoodItem.find({ restaurantId: id });
      }
    } else {
      restaurant = memoryRestaurants.find(r => r.id === id);
      if (restaurant) {
        items = memoryFoodItems.filter(f => f.restaurantId === id);
      }
    }

    if (!restaurant) {
      return res.status(404).json({ success: false, message: 'Restaurant not found' });
    }

    res.json({ success: true, data: { ...restaurant.toObject ? restaurant.toObject() : restaurant, menu: items } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 5. Food items
app.get('/api/food-items', async (req, res) => {
  try {
    const { category, search, vegOnly } = req.query;
    let list = [];

    if (isMongoConnected) {
      let query = {};
      if (category && category !== 'all') {
        query.category = category;
      }
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }
      if (vegOnly === 'true') {
        query.isVeg = true;
      }
      list = await FoodItem.find(query);
    } else {
      list = memoryFoodItems.filter(f => {
        const matchesCategory = !category || category === 'all' || f.category === category;
        const matchesSearch = !search || f.name.toLowerCase().includes(search.toLowerCase());
        const matchesVeg = vegOnly !== 'true' || f.isVeg;
        return matchesCategory && matchesSearch && matchesVeg;
      });
    }

    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 6. Validate Promo Code
app.post('/api/promos/validate', (req, res) => {
  const { code, cartSubtotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: "Please enter a valid promo code." });
  }

  const promo = promoCodes[code.toUpperCase()];
  if (!promo) {
    return res.status(404).json({ success: false, message: "Invalid promo code." });
  }

  if (cartSubtotal < promo.minCart) {
    return res.status(400).json({
      success: false,
      message: `Code requires a minimum order subtotal of $${promo.minCart.toFixed(2)}`
    });
  }

  let discountAmount = 0;
  if (promo.isFreeDelivery) {
    discountAmount = 1.99; // standard delivery credit
  } else {
    discountAmount = Math.min((cartSubtotal * promo.discountPercent) / 100, promo.maxDiscount);
  }

  res.json({
    success: true,
    data: {
      code: promo.code,
      discountAmount: parseFloat(discountAmount.toFixed(2)),
      isFreeDelivery: !!promo.isFreeDelivery
    }
  });
});

// 7. Place Order
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, phone, deliveryAddress, items, restaurantId, restaurantName, subtotal, deliveryFee, tax, discount, total, paymentMethod } = req.body;

    if (!customerName || !phone || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Missing required order details" });
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrderData = {
      orderId,
      customerName,
      phone,
      deliveryAddress,
      items,
      restaurantId: restaurantId || "rest-1",
      restaurantName: restaurantName || "Crave Craft Burgers",
      subtotal: parseFloat(subtotal),
      deliveryFee: parseFloat(deliveryFee),
      tax: parseFloat(tax),
      discount: parseFloat(discount || 0),
      total: parseFloat(total),
      paymentMethod: paymentMethod || "Card",
      status: "Received",
      estimatedDeliveryTime: "25-35 mins",
      driverName: "Alex Rivers",
      driverPhone: "+1 (555) 019-2834",
      createdAt: new Date()
    };

    if (isMongoConnected) {
      const orderDoc = new Order(newOrderData);
      await orderDoc.save();
    } else {
      memoryOrders.unshift(newOrderData);
    }

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: newOrderData
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 8. Get All Orders
app.get('/api/orders', async (req, res) => {
  try {
    let list = [];
    if (isMongoConnected) {
      list = await Order.find().sort({ createdAt: -1 });
    } else {
      list = memoryOrders;
    }
    res.json({ success: true, count: list.length, data: list });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 9. Get Single Order Status
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let order = null;
    if (isMongoConnected) {
      order = await Order.findOne({ orderId: id });
    } else {
      order = memoryOrders.find(o => o.orderId === id);
    }

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 10. Update Order Status (Admin / Driver endpoint)
app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Received', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    let updatedOrder = null;
    if (isMongoConnected) {
      updatedOrder = await Order.findOneAndUpdate(
        { orderId: id },
        { status },
        { new: true }
      );
    } else {
      const idx = memoryOrders.findIndex(o => o.orderId === id);
      if (idx !== -1) {
        memoryOrders[idx].status = status;
        updatedOrder = memoryOrders[idx];
      }
    }

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.json({ success: true, message: `Status updated to ${status}`, data: updatedOrder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// 11. Analytics for Admin Dashboard
app.get('/api/analytics', async (req, res) => {
  try {
    let ordersList = [];
    if (isMongoConnected) {
      ordersList = await Order.find();
    } else {
      ordersList = memoryOrders;
    }

    const totalRevenue = ordersList.reduce((acc, curr) => acc + (curr.total || 0), 0);
    const activeOrdersCount = ordersList.filter(o => o.status !== 'Delivered' && o.status !== 'Cancelled').length;
    const deliveredCount = ordersList.filter(o => o.status === 'Delivered').length;

    res.json({
      success: true,
      data: {
        totalOrders: ordersList.length,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        activeOrders: activeOrdersCount,
        completedOrders: deliveredCount,
        avgOrderValue: ordersList.length ? parseFloat((totalRevenue / ordersList.length).toFixed(2)) : 0
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 [Server] Food Delivery MERN API listening on port http://localhost:${PORT}`);
  });
}

export default app;


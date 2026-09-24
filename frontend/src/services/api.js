const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';


export const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/categories`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn("API Error, utilizing fallback context", err);
    return [
      { id: "all", name: "All Dishes", icon: "Utensils", count: 32 },
      { id: "burgers", name: "Gourmet Burgers", icon: "Beef", count: 6 },
      { id: "pizza", name: "Artisanal Pizza", icon: "Pizza", count: 5 },
      { id: "sushi", name: "Japanese & Sushi", icon: "Fish", count: 4 },
      { id: "indian", name: "Authentic Curry", icon: "Soup", count: 5 },
      { id: "asian", name: "Asian Wok", icon: "Bowl", count: 4 },
      { id: "healthy", name: "Salads & Greens", icon: "Salad", count: 4 },
      { id: "desserts", name: "Desserts & Bakes", icon: "IceCream", count: 4 }
    ];
  }
};

export const fetchRestaurants = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/restaurants?${query}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn("API Error fetching restaurants", err);
    return [];
  }
};

export const fetchRestaurantById = async (id) => {
  try {
    const res = await fetch(`${API_BASE_URL}/restaurants/${id}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn("API Error fetching restaurant detail", err);
    return null;
  }
};

export const fetchFoodItems = async (params = {}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/food-items?${query}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.warn("API Error fetching food items", err);
    return [];
  }
};

export const validatePromoCode = async (code, cartSubtotal) => {
  try {
    const res = await fetch(`${API_BASE_URL}/promos/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, cartSubtotal })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Server unavailable for promo validation' };
  }
};

export const placeOrderAPI = async (orderPayload) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    return await res.json();
  } catch (err) {
    console.warn("Server offline, placing local order", err);
    return {
      success: true,
      data: {
        ...orderPayload,
        orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        status: "Received",
        createdAt: new Date()
      }
    };
  }
};

export const fetchOrderById = async (orderId) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
};

export const fetchAllOrders = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders`);
    const data = await res.json();
    return data.data || [];
  } catch (err) {
    return [];
  }
};

export const updateOrderStatusAPI = async (orderId, status) => {
  try {
    const res = await fetch(`${API_BASE_URL}/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    return await res.json();
  } catch (err) {
    return { success: false, message: 'Network error updating status' };
  }
};

export const fetchAnalyticsAPI = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/analytics`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    return null;
  }
};

export const categories = [
  { id: "all", name: "All Dishes", icon: "Utensils", count: 32 },
  { id: "burgers", name: "Gourmet Burgers", icon: "Beef", count: 6 },
  { id: "pizza", name: "Artisanal Pizza", icon: "Pizza", count: 5 },
  { id: "sushi", name: "Japanese & Sushi", icon: "Fish", count: 4 },
  { id: "indian", name: "Authentic Curry", icon: "Soup", count: 5 },
  { id: "asian", name: "Asian Wok & Bowls", icon: "Bowl", count: 4 },
  { id: "healthy", name: "Salads & Greens", icon: "Salad", count: 4 },
  { id: "desserts", name: "Desserts & Bakes", icon: "IceCream", count: 4 }
];

export const restaurants = [
  {
    id: "rest-1",
    name: "Crave Craft Burgers",
    rating: 4.8,
    reviewsCount: 420,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    minOrder: 10.00,
    cuisines: ["Burgers", "American", "Fast Food"],
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
    badge: "Bestseller",
    priceRange: "$$",
    address: "142 Culinary St, Downtown",
    description: "Handcrafted smashed Angus beef burgers with house-made sauces and brioche buns."
  },
  {
    id: "rest-2",
    name: "Napoli Wood-Fired Pizza",
    rating: 4.9,
    reviewsCount: 680,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    minOrder: 15.00,
    cuisines: ["Pizza", "Italian"],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
    badge: "Top Rated",
    priceRange: "$$",
    address: "88 Little Italy Ave",
    description: "Authentic Neapolitan sourdough pizzas baked at 900°F in our imported stone oven."
  },
  {
    id: "rest-3",
    name: "Sakura Sushi & Omakase",
    rating: 4.9,
    reviewsCount: 512,
    deliveryTime: "30-40 min",
    deliveryFee: 3.99,
    minOrder: 20.00,
    cuisines: ["Japanese & Sushi", "Asian"],
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
    badge: "Chef Special",
    priceRange: "$$$",
    address: "305 Bayfront Dr",
    description: "Ultra-fresh sashimi grade fish, signature dragon rolls, and warm matcha desserts."
  },
  {
    id: "rest-4",
    name: "Taj Mahal Spice Kitchen",
    rating: 4.7,
    reviewsCount: 390,
    deliveryTime: "25-35 min",
    deliveryFee: 1.49,
    minOrder: 12.00,
    cuisines: ["Authentic Curry", "Indian"],
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    badge: "Free Delivery Offer",
    priceRange: "$$",
    address: "71 Curry Lane, Midtown",
    description: "Rich aromatics, garlic butter naans, and legendary slow-simmered tikka masala."
  },
  {
    id: "rest-5",
    name: "Green Garden Bowls & Salads",
    rating: 4.6,
    reviewsCount: 230,
    deliveryTime: "15-25 min",
    deliveryFee: 0.99,
    minOrder: 8.00,
    cuisines: ["Salads & Greens", "Healthy"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    badge: "Organic",
    priceRange: "$$",
    address: "12 Health Blvd",
    description: "Farm-to-table grain bowls, organic smoothies, and crisp seasonal salad combinations."
  },
  {
    id: "rest-6",
    name: "Sweet Dreams Bakery & Gelato",
    rating: 4.9,
    reviewsCount: 840,
    deliveryTime: "15-20 min",
    deliveryFee: 1.99,
    minOrder: 5.00,
    cuisines: ["Desserts & Bakes"],
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    badge: "Sweet Tooth",
    priceRange: "$",
    address: "99 Sugar Alley",
    description: "Decadent molten lava cakes, artisan gelato, and fresh macarons made daily."
  }
];

export const foodItems = [
  // Crave Craft Burgers
  {
    id: "food-101",
    restaurantId: "rest-1",
    name: "The Truffle Monster Burger",
    category: "burgers",
    price: 14.99,
    rating: 4.9,
    prepTime: "15 mins",
    calories: "850 kcal",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    description: "Double grass-fed patty, truffle aioli, aged Swiss cheese, caramelized onions on toasted brioche.",
    isPopular: true,
    isVeg: false,
    addons: [
      { name: "Extra Smoked Bacon", price: 2.50 },
      { name: "Extra Cheese Slice", price: 1.50 },
      { name: "Crispy Onion Rings side", price: 3.99 }
    ]
  },
  {
    id: "food-102",
    restaurantId: "rest-1",
    name: "Smoky BBQ Jalapeño Smash",
    category: "burgers",
    price: 12.99,
    rating: 4.7,
    prepTime: "12 mins",
    calories: "780 kcal",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80",
    description: "Crispy edges smash patty, house smoked BBQ, charred jalapeños, cheddar cheese.",
    isPopular: false,
    isVeg: false,
    addons: [
      { name: "Side Truffle Fries", price: 4.50 },
      { name: "Spicy Dip", price: 0.99 }
    ]
  },
  {
    id: "food-103",
    restaurantId: "rest-1",
    name: "Crispy Avocado Plant Burger",
    category: "burgers",
    price: 13.50,
    rating: 4.8,
    prepTime: "15 mins",
    calories: "620 kcal",
    image: "https://images.unsplash.com/photo-1525059696034-4967a8e1dca2?auto=format&fit=crop&w=600&q=80",
    description: "Beyond Meat patty, sliced Haas avocado, vegan garlic mayo, crisp romaine lettuce.",
    isPopular: true,
    isVeg: true,
    addons: [
      { name: "Gluten-Free Bun", price: 1.99 },
      { name: "Vegan Cheese", price: 1.50 }
    ]
  },

  // Napoli Wood-Fired Pizza
  {
    id: "food-201",
    restaurantId: "rest-2",
    name: "Classic Margherita Supreme",
    category: "pizza",
    price: 16.99,
    rating: 4.9,
    prepTime: "20 mins",
    calories: "920 kcal",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80",
    description: "San Marzano tomato sauce, fresh buffalo mozzarella, fragrant basil leaves, extra virgin olive oil.",
    isPopular: true,
    isVeg: true,
    addons: [
      { name: "Stuffed Crust", price: 3.50 },
      { name: "Extra Mozzarella", price: 2.00 }
    ]
  },
  {
    id: "food-202",
    restaurantId: "rest-2",
    name: "Double Pepperoni Hot Honey",
    category: "pizza",
    price: 18.99,
    rating: 4.95,
    prepTime: "20 mins",
    calories: "1150 kcal",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80",
    description: "Crispy cupped pepperoni, spicy chili honey drizzle, mozzarella, chili flakes.",
    isPopular: true,
    isVeg: false,
    addons: [
      { name: "Garlic Butter Dipping Sauce", price: 1.25 },
      { name: "Chili Honey Jar", price: 2.99 }
    ]
  },
  {
    id: "food-203",
    restaurantId: "rest-2",
    name: "Truffle Mushroom Ricotta Pizza",
    category: "pizza",
    price: 19.50,
    rating: 4.8,
    prepTime: "22 mins",
    calories: "890 kcal",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
    description: "White sauce base, roasted wild mushrooms, creamy ricotta, black truffle drizzle.",
    isPopular: false,
    isVeg: true,
    addons: [
      { name: "Fresh Arugula Topping", price: 1.50 }
    ]
  },

  // Sakura Sushi
  {
    id: "food-301",
    restaurantId: "rest-3",
    name: "Dragon Salmon Roll (8pcs)",
    category: "sushi",
    price: 17.50,
    rating: 4.9,
    prepTime: "18 mins",
    calories: "540 kcal",
    image: "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80",
    description: "Tempura shrimp inside, topped with torched Atlantic salmon, spicy mayo, and unagi glaze.",
    isPopular: true,
    isVeg: false,
    addons: [
      { name: "Wasabi Mayo", price: 0.99 },
      { name: "Extra Pickled Ginger", price: 0.75 }
    ]
  },
  {
    id: "food-302",
    restaurantId: "rest-3",
    name: "Chef's Sashimi Deluxe Platter",
    category: "sushi",
    price: 24.99,
    rating: 4.95,
    prepTime: "20 mins",
    calories: "450 kcal",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80",
    description: "12 pieces of master-cut salmon, bluefin tuna, and yellowtail sashimi served over ice.",
    isPopular: true,
    isVeg: false,
    addons: [
      { name: "Real Wasabi Root", price: 2.50 }
    ]
  },

  // Taj Mahal Spice
  {
    id: "food-401",
    restaurantId: "rest-4",
    name: "Butter Chicken Royale & Naan",
    category: "indian",
    price: 15.99,
    rating: 4.9,
    prepTime: "25 mins",
    calories: "780 kcal",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80",
    description: "Tender tandoori chicken cooked in rich tomato butter gravy, served with fluffy garlic naan.",
    isPopular: true,
    isVeg: false,
    addons: [
      { name: "Extra Garlic Naan", price: 2.99 },
      { name: "Basmati Biryani Rice", price: 3.50 }
    ]
  },
  {
    id: "food-402",
    restaurantId: "rest-4",
    name: "Paneer Tikka Masala Bowl",
    category: "indian",
    price: 14.50,
    rating: 4.7,
    prepTime: "20 mins",
    calories: "650 kcal",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    description: "Char-grilled cottage cheese cubes simmered in spicy onion-tomato gravy with aromatic spices.",
    isPopular: false,
    isVeg: true,
    addons: [
      { name: "Sweet Mango Lassi", price: 3.99 }
    ]
  },

  // Healthy Bowls
  {
    id: "food-501",
    restaurantId: "rest-5",
    name: "Salmon Quinoa Power Bowl",
    category: "healthy",
    price: 15.25,
    rating: 4.8,
    prepTime: "15 mins",
    calories: "510 kcal",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    description: "Pan-seared wild salmon, organic quinoa, avocado, edamame, cucumber, and sesame ginger dressing.",
    isPopular: true,
    isVeg: false,
    addons: [
      { name: "Extra Avocado", price: 2.00 },
      { name: "Boiled Organic Egg", price: 1.50 }
    ]
  },

  // Desserts
  {
    id: "food-601",
    restaurantId: "rest-6",
    name: "Belgian Chocolate Lava Cake",
    category: "desserts",
    price: 8.99,
    rating: 4.95,
    prepTime: "10 mins",
    calories: "480 kcal",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    description: "Warm dark chocolate cake with a molten flowing center, served with vanilla bean gelato.",
    isPopular: true,
    isVeg: true,
    addons: [
      { name: "Extra Scoop Vanilla Gelato", price: 2.50 },
      { name: "Berry Compote Drizzle", price: 1.00 }
    ]
  }
];

export const promoCodes = {
  "WELCOME50": { discountPercent: 50, maxDiscount: 10, minCart: 15, code: "WELCOME50" },
  "CRAVE20": { discountPercent: 20, maxDiscount: 15, minCart: 20, code: "CRAVE20" },
  "FASTFREE": { discountPercent: 100, isFreeDelivery: true, minCart: 10, code: "FASTFREE" }
};

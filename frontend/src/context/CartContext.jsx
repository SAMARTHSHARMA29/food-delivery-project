import React, { createContext, useContext, useState, useEffect } from 'react';
import { validatePromoCode, placeOrderAPI } from '../services/api';
import confetti from 'canvas-confetti';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addToCart = (foodItem, selectedAddons = [], quantity = 1) => {
    const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
    const unitPrice = foodItem.price + addonsTotal;
    const cartItemId = `${foodItem.id}-${selectedAddons.map(a => a.name).sort().join('-')}`;

    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].itemTotal = updated[existingIdx].quantity * unitPrice;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            foodId: foodItem.id,
            restaurantId: foodItem.restaurantId,
            name: foodItem.name,
            image: foodItem.image,
            basePrice: foodItem.price,
            unitPrice,
            quantity,
            selectedAddons,
            itemTotal: unitPrice * quantity
          }
        ];
      }
    });

    showToast(`Added "${foodItem.name}" to cart! 🍔`, 'success');
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        return {
          ...item,
          quantity: newQty,
          itemTotal: newQty * item.unitPrice
        };
      }
      return item;
    }).filter(Boolean));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const deliveryFee = cart.length > 0 ? (appliedPromo?.isFreeDelivery ? 0 : 1.99) : 0;
  const tax = subtotal * 0.08; // 8% sales tax
  const discountAmount = appliedPromo ? appliedPromo.discountAmount : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee + tax - discountAmount);

  const applyPromo = async (code) => {
    if (!code) return { success: false, message: "Please enter a code" };
    const res = await validatePromoCode(code, subtotal);
    if (res.success) {
      setAppliedPromo(res.data);
      showToast(`Promo "${res.data.code}" applied successfully! 🎉`, 'success');
    } else {
      showToast(res.message, 'error');
    }
    return res;
  };

  const removePromo = () => {
    setAppliedPromo(null);
    showToast("Promo code removed", 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const checkoutOrder = async ({ customerName, phone, deliveryAddress, paymentMethod }) => {
    if (cart.length === 0) return { success: false, message: "Cart is empty" };

    const payload = {
      customerName: customerName || "Samarth Patel",
      phone: phone || "+1 (555) 321-9889",
      deliveryAddress: deliveryAddress || "742 Evergreen Terrace, Downtown",
      items: cart,
      restaurantId: cart[0]?.restaurantId || "rest-1",
      restaurantName: "Crave Craft Gourmet",
      subtotal: parseFloat(subtotal.toFixed(2)),
      deliveryFee: parseFloat(deliveryFee.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      discount: parseFloat(discountAmount.toFixed(2)),
      total: parseFloat(grandTotal.toFixed(2)),
      paymentMethod: paymentMethod || "Card"
    };

    const res = await placeOrderAPI(payload);
    if (res.success) {
      setActiveOrder(res.data);
      clearCart();
      setIsCartOpen(false);
      showToast("🚀 Order Placed Successfully! Tracking driver...", 'success');

      // Trigger Celebration Confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }
    }
    return res;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      subtotal,
      deliveryFee,
      tax,
      discountAmount,
      grandTotal,
      isCartOpen,
      setIsCartOpen,
      appliedPromo,
      applyPromo,
      removePromo,
      activeOrder,
      setActiveOrder,
      checkoutOrder,
      clearCart,
      toastMessage,
      showToast
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

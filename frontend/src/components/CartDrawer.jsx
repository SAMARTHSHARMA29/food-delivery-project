import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, Tag, CreditCard, DollarSign, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

export const CartDrawer = ({ userAddress, onOpenTracker }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    deliveryFee,
    tax,
    discountAmount,
    grandTotal,
    appliedPromo,
    applyPromo,
    removePromo,
    checkoutOrder
  } = useCart();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [customerName, setCustomerName] = useState('Samarth Patel');
  const [phone, setPhone] = useState('+1 (555) 982-1100');
  const [deliveryAddress, setDeliveryAddress] = useState(userAddress || '742 Evergreen Terrace, Downtown');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyPromo = async (e) => {
    e.preventDefault();
    if (!promoCodeInput.trim()) return;
    await applyPromo(promoCodeInput.trim());
    setPromoCodeInput('');
  };

  const handleCheckout = async () => {
    setIsSubmitting(true);
    const res = await checkoutOrder({
      customerName,
      phone,
      deliveryAddress,
      paymentMethod
    });
    setIsSubmitting(false);
    if (res.success) {
      onOpenTracker();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(10, 15, 29, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      justifyContent: 'flex-end'
    }} onClick={() => setIsCartOpen(false)}>
      
      <div 
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: 'rgba(15, 23, 42, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 40px rgba(0,0,0,0.6)',
          borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize: '1.3rem', color: '#FFF' }}>Your Crave Basket 🛒</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X style={{ width: 22, height: 22 }} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍽️</div>
              <h3 style={{ color: '#FFF', marginBottom: '8px' }}>Your cart is empty</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Add some delicious artisan burgers, wood-fired pizza, or fresh sushi to get started!
              </p>
            </div>
          ) : (
            <>
              {/* Item List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {cart.map(item => (
                  <div 
                    key={item.cartItemId}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-light)',
                      alignItems: 'center'
                    }}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '64px', height: '64px', borderRadius: '10px', objectFit: 'cover' }}
                    />
                    
                    <div style={{ flex: 1 }}>
                      <h4 style={{ color: '#FFF', fontSize: '0.95rem', marginBottom: '2px' }}>{item.name}</h4>
                      {item.selectedAddons.length > 0 && (
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                          + {item.selectedAddons.map(a => a.name).join(', ')}
                        </p>
                      )}
                      <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.9rem' }}>
                        ${item.itemTotal.toFixed(2)}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'rgba(255,255,255,0.06)',
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-full)'
                      }}>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                          style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex' }}
                        >
                          <Minus style={{ width: 14, height: 14 }} />
                        </button>
                        <span style={{ fontSize: '0.85rem', color: '#FFF', fontWeight: 700 }}>{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                          style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex' }}
                        >
                          <Plus style={{ width: 14, height: 14 }} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{ background: 'none', border: 'none', color: '#FF5252', cursor: 'pointer', padding: '4px' }}
                      >
                        <Trash2 style={{ width: 16, height: 16 }} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Promo Code Form */}
              <div style={{ marginBottom: '24px' }}>
                {appliedPromo ? (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(0, 230, 118, 0.12)',
                    border: '1px solid rgba(0, 230, 118, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag style={{ color: 'var(--secondary)', width: 18, height: 18 }} />
                      <span style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: 600 }}>
                        Code {appliedPromo.code} Active (-${appliedPromo.discountAmount.toFixed(2)})
                      </span>
                    </div>
                    <button 
                      onClick={removePromo}
                      style={{ background: 'none', border: 'none', color: '#FF5252', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 700 }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Promo Code (WELCOME50, FASTFREE)"
                      value={promoCodeInput}
                      onChange={e => setPromoCodeInput(e.target.value)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-light)',
                        color: '#FFF',
                        outline: 'none',
                        fontSize: '0.88rem'
                      }}
                    />
                    <button type="submit" className="btn-secondary" style={{ padding: '10px 16px' }}>
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Delivery Address & Contact */}
              <div style={{ marginBottom: '24px', padding: '16px', borderRadius: 'var(--radius-md)', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-light)' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Delivery Destination</h4>
                
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="Your Name"
                  style={{ width: '100%', padding: '8px 12px', marginBottom: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                />
                
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={e => setDeliveryAddress(e.target.value)}
                  placeholder="Street Address, Apt"
                  style={{ width: '100%', padding: '8px 12px', marginBottom: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                />

                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                />
              </div>

              {/* Payment Method Selection */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Payment Method</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                  {[
                    { id: 'Card', label: 'Credit Card', icon: CreditCard },
                    { id: 'ApplePay', label: 'Apple Pay', icon: Smartphone },
                    { id: 'Cash', label: 'Cash', icon: DollarSign }
                  ].map(m => {
                    const Icon = m.icon;
                    const isSelected = paymentMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        style={{
                          padding: '10px 8px',
                          borderRadius: '8px',
                          background: isSelected ? 'rgba(255, 82, 82, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                          border: isSelected ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                          color: isSelected ? '#FFF' : 'var(--text-muted)',
                          fontSize: '0.78rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        <Icon style={{ width: 16, height: 16, color: isSelected ? 'var(--primary)' : 'var(--text-dim)' }} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Financial Calculation breakdown */}
              <div style={{
                paddingTop: '16px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.9rem',
                color: 'var(--text-muted)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Items Subtotal</span>
                  <span style={{ color: '#FFF' }}>${subtotal.toFixed(2)}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Fee</span>
                  <span style={{ color: deliveryFee === 0 ? 'var(--secondary)' : '#FFF' }}>
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Estimated Tax (8%)</span>
                  <span style={{ color: '#FFF' }}>${tax.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--secondary)' }}>
                    <span>Promo Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justify: 'space-between',
                  paddingTop: '12px',
                  marginTop: '6px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#FFF'
                }}>
                  <span>Total</span>
                  <span style={{ color: 'var(--primary)' }}>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </>
          )}

        </div>

        {/* Footer Checkout Button */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border-light)' }}>
            <button 
              onClick={handleCheckout}
              disabled={isSubmitting}
              className="btn-primary hover-lift"
              style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
            >
              {isSubmitting ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Place Order (${grandTotal.toFixed(2)})</span>
                  <ArrowRight style={{ width: 20, height: 20 }} />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

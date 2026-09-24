import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Check, Flame, Clock } from 'lucide-react';

export const DishModal = ({ foodItem, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState([]);

  if (!foodItem) return null;

  const toggleAddon = (addon) => {
    setSelectedAddons(prev => {
      const exists = prev.some(a => a.name === addon.name);
      if (exists) {
        return prev.filter(a => a.name !== addon.name);
      } else {
        return [...prev, addon];
      }
    });
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const itemTotal = (foodItem.price + addonsTotal) * quantity;

  const handleConfirm = () => {
    addToCart(foodItem, selectedAddons, quantity);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'rgba(10, 15, 29, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      
      <div 
        className="glass-panel"
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          animation: 'slideUp 0.25s ease-out'
        }}
      >
        {/* Header Image */}
        <div style={{
          position: 'relative',
          height: '220px',
          backgroundImage: `url(${foodItem.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}>
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(10, 15, 29, 0.7)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X style={{ width: 20, height: 20 }} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '1.4rem', color: '#FFF' }}>{foodItem.name}</h2>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              ${foodItem.price.toFixed(2)}
            </span>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px' }}>
            {foodItem.description}
          </p>

          {/* Addons Section */}
          {foodItem.addons && foodItem.addons.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#FFF', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Customize & Add-ons
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {foodItem.addons.map(addon => {
                  const isChecked = selectedAddons.some(a => a.name === addon.name);
                  return (
                    <div 
                      key={addon.name}
                      onClick={() => toggleAddon(addon)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-md)',
                        background: isChecked ? 'rgba(255, 82, 82, 0.12)' : 'rgba(255, 255, 255, 0.04)',
                        border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: isChecked ? 'none' : '1px solid var(--text-dim)',
                          background: isChecked ? 'var(--primary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {isChecked && <Check style={{ width: 14, height: 14, color: '#FFF' }} />}
                        </div>
                        <span style={{ color: '#FFF', fontSize: '0.9rem', fontWeight: isChecked ? 600 : 400 }}>{addon.name}</span>
                      </div>
                      <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: '0.88rem' }}>
                        +${addon.price.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quantity Controls & Confirm Button */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-light)'
          }}>
            
            {/* Quantity Stepper */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255, 255, 255, 0.06)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)'
            }}>
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex' }}
              >
                <Minus style={{ width: 16, height: 16 }} />
              </button>
              <span style={{ color: '#FFF', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer', display: 'flex' }}
              >
                <Plus style={{ width: 16, height: 16 }} />
              </button>
            </div>

            {/* Submit Add to Cart Button */}
            <button 
              onClick={handleConfirm}
              className="btn-primary"
              style={{ flex: 1, marginLeft: '16px', padding: '14px 20px', fontSize: '1rem' }}
            >
              <span>Add to Cart</span>
              <span>• ${itemTotal.toFixed(2)}</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};

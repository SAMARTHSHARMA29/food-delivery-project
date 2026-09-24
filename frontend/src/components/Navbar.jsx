import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, MapPin, Search, Flame, Navigation, ShieldCheck, Clock } from 'lucide-react';

export const Navbar = ({ 
  searchTerm, 
  setSearchTerm, 
  userAddress, 
  setUserAddress,
  isAdminView, 
  setIsAdminView,
  onOpenTracker 
}) => {
  const { cart, setIsCartOpen, activeOrder } = useCart();
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="glass-header" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '16px 0' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        
        {/* Brand Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setIsAdminView(false)}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #FF5252, #FF1744)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(255, 82, 82, 0.4)'
          }}>
            <Flame style={{ color: '#FFF', width: 24, height: 24 }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', color: '#FFF', lineHeight: 1 }}>CRAVE<span style={{ color: 'var(--primary)' }}>DASH</span></h2>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>Ultra-Fast Delivery</span>
          </div>
        </div>

        {/* Address Pill */}
        <div className="glass-panel" style={{
          padding: '8px 16px',
          borderRadius: 'var(--radius-full)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.88rem',
          cursor: 'pointer'
        }}
        onClick={() => {
          const newLoc = prompt("Enter delivery address:", userAddress);
          if (newLoc) setUserAddress(newLoc);
        }}>
          <MapPin style={{ color: 'var(--primary)', width: 16, height: 16 }} />
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Deliver To</span>
            <strong style={{ color: '#FFF', fontSize: '0.85rem' }}>{userAddress}</strong>
          </div>
        </div>

        {/* Global Search Bar */}
        <div style={{ flex: 1, maxWidth: '420px', position: 'relative' }}>
          <Search style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            width: 18,
            height: 18
          }} />
          <input
            type="text"
            placeholder="Search burgers, sushi, pizza, or restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 46px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-light)',
              color: '#FFF',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
          />
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          
          {/* Active Order Tracker Button if order exists */}
          {activeOrder && (
            <button 
              onClick={onOpenTracker}
              className="btn-secondary"
              style={{
                borderColor: 'var(--accent)',
                color: 'var(--accent)',
                background: 'rgba(255, 179, 0, 0.1)',
                padding: '8px 14px'
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'inline-block',
                boxShadow: '0 0 8px var(--accent)'
              }}></span>
              <Clock style={{ width: 16, height: 16 }} />
              <span>Track Order</span>
            </button>
          )}

          {/* Admin Toggle */}
          <button 
            onClick={() => setIsAdminView(!isAdminView)}
            className="btn-secondary"
            style={{
              borderColor: isAdminView ? 'var(--primary)' : 'var(--border-light)',
              background: isAdminView ? 'rgba(255, 82, 82, 0.15)' : 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <ShieldCheck style={{ width: 18, height: 18, color: isAdminView ? 'var(--primary)' : 'var(--text-muted)' }} />
            <span style={{ fontSize: '0.85rem' }}>{isAdminView ? 'Customer Store' : 'Admin Panel'}</span>
          </button>

          {/* Cart Button */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="btn-primary hover-lift"
            style={{ position: 'relative', padding: '10px 20px' }}
          >
            <ShoppingBag style={{ width: 20, height: 20 }} />
            <span>Cart</span>
            {totalCartCount > 0 && (
              <span style={{
                background: '#FFF',
                color: 'var(--primary)',
                borderRadius: '50%',
                fontWeight: 800,
                fontSize: '0.8rem',
                width: '22px',
                height: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '4px'
              }}>
                {totalCartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};

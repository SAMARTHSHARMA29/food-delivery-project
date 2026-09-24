import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { fetchOrderById } from '../services/api';
import { CheckCircle2, ChefHat, Bike, Home, Phone, RefreshCw, X, MapPin } from 'lucide-react';

export const OrderTrackerModal = ({ onClose }) => {
  const { activeOrder, setActiveOrder } = useCart();
  const [liveOrder, setLiveOrder] = useState(activeOrder);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLiveOrder(activeOrder);
  }, [activeOrder]);

  const handleRefresh = async () => {
    if (!liveOrder?.orderId) return;
    setIsRefreshing(true);
    const updated = await fetchOrderById(liveOrder.orderId);
    if (updated) {
      setLiveOrder(updated);
      setActiveOrder(updated);
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (!liveOrder) return null;

  const steps = [
    { key: 'Received', label: 'Order Placed', icon: CheckCircle2 },
    { key: 'Preparing', label: 'Kitchen Preparing', icon: ChefHat },
    { key: 'Out for Delivery', label: 'Rider En Route', icon: Bike },
    { key: 'Delivered', label: 'Delivered', icon: Home }
  ];

  const getStepIndex = (status) => {
    switch (status) {
      case 'Received': return 0;
      case 'Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      default: return 0;
    }
  };

  const currentIdx = getStepIndex(liveOrder.status);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 99999,
      background: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(12px)',
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
          maxWidth: '680px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid rgba(255, 255, 255, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: 'rgba(23, 32, 54, 0.9)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Live Tracking • Order #{liveOrder.orderId}
            </span>
            <h3 style={{ color: '#FFF', fontSize: '1.25rem' }}>
              Estimated Arrival: <span style={{ color: 'var(--accent)' }}>{liveOrder.estimatedDeliveryTime || '20-25 mins'}</span>
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button 
              onClick={handleRefresh}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '8px 12px',
                color: '#FFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem'
              }}
            >
              <RefreshCw style={{ width: 14, height: 14, animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
              <span>Refresh</span>
            </button>
            <button 
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            >
              <X style={{ width: 22, height: 22 }} />
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div style={{ padding: '24px 32px', background: 'rgba(15, 23, 42, 0.6)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            
            {/* Background Line */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '40px',
              right: '40px',
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
              zIndex: 1
            }}>
              <div style={{
                height: '100%',
                width: `${(currentIdx / (steps.length - 1)) * 100}%`,
                background: 'var(--primary)',
                transition: 'width 0.5s ease-in-out'
              }}></div>
            </div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isCompleted = idx <= currentIdx;
              const isCurrent = idx === currentIdx;

              return (
                <div key={step.key} style={{ zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: isCompleted ? 'var(--primary)' : '#1E293B',
                    border: isCurrent ? '3px solid var(--accent)' : '2px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCompleted ? '#FFF' : 'var(--text-dim)',
                    boxShadow: isCurrent ? '0 0 15px var(--primary-glow)' : 'none',
                    transition: 'all 0.3s ease'
                  }}>
                    <Icon style={{ width: 20, height: 20 }} />
                  </div>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCompleted ? '#FFF' : 'var(--text-dim)'
                  }}>
                    {step.label}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Interactive Live Map Display */}
        <div style={{
          height: '220px',
          background: '#070C18',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(30,41,59,0.4) 0%, rgba(7,12,24,0.9) 100%)'
        }}>
          
          {/* Simulated Map Roads */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.25 }}>
            <line x1="0" y1="50" x2="680" y2="50" stroke="#FFF" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="0" y1="120" x2="680" y2="120" stroke="#FFF" strokeWidth="3" />
            <line x1="0" y1="180" x2="680" y2="180" stroke="#FFF" strokeWidth="2" strokeDasharray="6,6" />
            <line x1="150" y1="0" x2="150" y2="220" stroke="#FFF" strokeWidth="2" />
            <line x1="450" y1="0" x2="450" y2="220" stroke="#FFF" strokeWidth="3" />
          </svg>

          {/* Restaurant Pin */}
          <div style={{ position: 'absolute', left: '100px', top: '90px', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 10px #10B981' }}>
              <ChefHat style={{ width: 18, height: 18, color: '#FFF' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: '#FFF', display: 'block', marginTop: '4px', fontWeight: 600 }}>Kitchen</span>
          </div>

          {/* Moving Delivery Rider Marker */}
          <div className="animate-float-bike" style={{
            position: 'absolute',
            left: currentIdx === 0 ? '120px' : currentIdx === 1 ? '220px' : currentIdx === 2 ? '380px' : '520px',
            top: '95px',
            transition: 'left 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary), #FF1744)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px var(--primary)',
              border: '2px solid #FFF'
            }}>
              <Bike style={{ width: 22, height: 22, color: '#FFF' }} />
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 700, display: 'block', marginTop: '2px' }}>
              {liveOrder.driverName || 'Alex'}
            </span>
          </div>

          {/* Destination Pin */}
          <div style={{ position: 'absolute', right: '100px', top: '90px', textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', boxShadow: '0 0 12px var(--accent)' }}>
              <MapPin style={{ width: 18, height: 18, color: '#0F172A' }} />
            </div>
            <span style={{ fontSize: '0.7rem', color: '#FFF', display: 'block', marginTop: '4px', fontWeight: 600 }}>Destination</span>
          </div>

        </div>

        {/* Rider Profile Card & Items Breakdown */}
        <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          {/* Rider Card */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80")',
              backgroundSize: 'cover'
            }}></div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#FFF', fontSize: '0.95rem' }}>{liveOrder.driverName || 'Alex Rivers'}</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Express Delivery Specialist</span>
              <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontSize: '0.8rem', fontWeight: 700 }}>
                ★ 4.98 Rating
              </div>
            </div>
            <a 
              href={`tel:${liveOrder.driverPhone}`}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0, 230, 118, 0.15)',
                border: '1px solid rgba(0, 230, 118, 0.4)',
                color: 'var(--secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              <Phone style={{ width: 18, height: 18 }} />
            </a>
          </div>

          {/* Order Brief Summary */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-light)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Delivery Address</span>
              <p style={{ color: '#FFF', fontSize: '0.85rem', fontWeight: 600, marginTop: '2px' }}>{liveOrder.deliveryAddress}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Amount Paid</span>
              <strong style={{ color: 'var(--primary)', fontSize: '1rem' }}>${liveOrder.total ? liveOrder.total.toFixed(2) : '0.00'}</strong>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

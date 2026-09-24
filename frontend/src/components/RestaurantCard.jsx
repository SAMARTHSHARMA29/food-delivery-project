import React from 'react';
import { Star, Clock, Bike, MapPin } from 'lucide-react';

export const RestaurantCard = ({ restaurant, onSelect }) => {
  return (
    <div 
      className="glass-panel hover-lift"
      onClick={() => onSelect(restaurant)}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      {/* Restaurant Image with Badge Overlay */}
      <div style={{
        position: 'relative',
        height: '180px',
        backgroundImage: `url(${restaurant.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(10, 15, 29, 0.9) 0%, transparent 60%)'
        }}></div>

        {/* Badge */}
        {restaurant.badge && (
          <span className="badge-tag badge-popular" style={{
            position: 'absolute',
            top: '12px',
            left: '12px'
          }}>
            {restaurant.badge}
          </span>
        )}

        {/* Rating Tag */}
        <div className="badge-tag badge-rating" style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px'
        }}>
          <Star style={{ width: 14, height: 14, fill: 'currentColor' }} />
          <span>{restaurant.rating} ({restaurant.reviewsCount})</span>
        </div>
      </div>

      {/* Content Body */}
      <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 style={{ color: '#FFF', fontSize: '1.15rem' }}>{restaurant.name}</h3>
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700 }}>{restaurant.priceRange}</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px', lineHeight: 1.4 }}>
            {restaurant.cuisines.join(' • ')}
          </p>
        </div>

        {/* Footer info: ETA & Fee */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-light)',
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock style={{ width: 15, height: 15, color: 'var(--primary)' }} />
            <span>{restaurant.deliveryTime}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Bike style={{ width: 15, height: 15, color: 'var(--secondary)' }} />
            <span>${restaurant.deliveryFee.toFixed(2)} Delivery</span>
          </div>
        </div>

      </div>
    </div>
  );
};

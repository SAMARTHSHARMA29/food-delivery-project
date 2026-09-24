import React from 'react';
import { Plus, Star, Flame, Leaf } from 'lucide-react';

export const FoodItemCard = ({ foodItem, onCustomize }) => {
  return (
    <div 
      className="glass-panel hover-lift"
      style={{
        borderRadius: 'var(--radius-lg)',
        padding: '16px',
        display: 'grid',
        gridTemplateColumns: '120px 1fr',
        gap: '16px',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Food Image */}
      <div style={{
        width: '120px',
        height: '110px',
        borderRadius: 'var(--radius-md)',
        backgroundImage: `url(${foodItem.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {foodItem.isPopular && (
          <span className="badge-tag badge-popular" style={{ position: 'absolute', top: '-6px', left: '-6px', fontSize: '0.65rem' }}>
            Popular
          </span>
        )}
      </div>

      {/* Details */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          {foodItem.isVeg ? (
            <span className="badge-tag badge-veg" style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', padding: '2px 6px', fontSize: '0.7rem' }}>
              <Leaf style={{ width: 10, height: 10 }} /> Veg
            </span>
          ) : (
            <span style={{ fontSize: '0.7rem', color: '#FF5252', background: 'rgba(255,82,82,0.1)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(255,82,82,0.3)' }}>
              Non-Veg
            </span>
          )}

          {foodItem.calories && (
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
              <Flame style={{ width: 12, height: 12, color: 'var(--accent)' }} /> {foodItem.calories}
            </span>
          )}
        </div>

        <h4 style={{ color: '#FFF', fontSize: '1.05rem', marginBottom: '6px' }}>{foodItem.name}</h4>
        <p style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
          marginBottom: '12px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {foodItem.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
            ${foodItem.price.toFixed(2)}
          </span>

          <button
            onClick={() => onCustomize(foodItem)}
            className="btn-primary"
            style={{
              padding: '6px 14px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <Plus style={{ width: 16, height: 16 }} />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};

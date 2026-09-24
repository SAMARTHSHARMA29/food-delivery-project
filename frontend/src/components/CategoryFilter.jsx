import React from 'react';
import { Utensils, Beef, Pizza as PizzaIcon, Fish, Soup, Salad, IceCream, Flame } from 'lucide-react';

const iconMap = {
  Utensils: Utensils,
  Beef: Beef,
  Pizza: PizzaIcon,
  Fish: Fish,
  Soup: Soup,
  Bowl: Flame,
  Salad: Salad,
  IceCream: IceCream
};

export const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <section style={{ marginBottom: '32px' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>Explore Categories</h3>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Filter dishes by cravings</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          overflowX: 'auto',
          paddingBottom: '8px'
        }}>
          {categories.map(cat => {
            const IconComponent = iconMap[cat.icon] || Utensils;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="hover-lift"
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, var(--primary) 0%, #FF2A2A 100%)' 
                    : 'rgba(23, 32, 54, 0.6)',
                  border: isActive ? '1px solid var(--primary)' : '1px solid var(--border-light)',
                  color: isActive ? '#FFF' : 'var(--text-muted)',
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: isActive ? '0 4px 15px var(--primary-glow)' : 'none'
                }}
              >
                <IconComponent style={{ width: 18, height: 18, color: isActive ? '#FFF' : 'var(--primary)' }} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

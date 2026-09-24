import React from 'react';
import { useCart } from '../context/CartContext';
import { Zap, Tag, ShieldAlert, Award, ArrowRight } from 'lucide-react';

export const HeroBanner = () => {
  const { applyPromo } = useCart();

  return (
    <section style={{ margin: '24px 0 40px 0' }}>
      <div className="container">
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '48px 40px',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '40px',
          alignItems: 'center',
          boxShadow: 'var(--shadow-lg)'
        }}>
          
          {/* Background Glow Accents */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,82,82,0.2) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}></div>

          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255, 179, 0, 0.15)',
              border: '1px solid rgba(255, 179, 0, 0.3)',
              color: 'var(--accent)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '16px'
            }}>
              <Zap style={{ width: 16, height: 16 }} />
              <span>Average 24 Minute Express Delivery</span>
            </div>

            <h1 style={{
              fontSize: '3rem',
              lineHeight: 1.15,
              color: '#FFF',
              marginBottom: '18px'
            }}>
              Craving <span style={{
                background: 'linear-gradient(135deg, #FF5252, #FFB300)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Gourmet Delights</span> Delivered In Minutes.
            </h1>

            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              lineHeight: 1.6,
              marginBottom: '28px',
              maxWidth: '540px'
            }}>
              Order from top-tier wood-fired pizzerias, artisan smash burger joints, and fresh sushi bars with real-time GPS tracking.
            </p>

            {/* Promo Voucher Badges */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              
              <div 
                className="hover-lift"
                onClick={() => applyPromo("WELCOME50")}
                style={{
                  background: 'rgba(255, 82, 82, 0.12)',
                  border: '1.5px dashed var(--primary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <Tag style={{ color: 'var(--primary)', width: 22, height: 22 }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Use Code</span>
                  <strong style={{ color: '#FFF', fontSize: '1rem', letterSpacing: '1px' }}>WELCOME50</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', fontWeight: 600 }}>50% OFF First Order</span>
                </div>
              </div>

              <div 
                className="hover-lift"
                onClick={() => applyPromo("FASTFREE")}
                style={{
                  background: 'rgba(0, 230, 118, 0.12)',
                  border: '1.5px dashed var(--secondary)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer'
                }}
              >
                <Tag style={{ color: 'var(--secondary)', width: 22, height: 22 }} />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Use Code</span>
                  <strong style={{ color: '#FFF', fontSize: '1rem', letterSpacing: '1px' }}>FASTFREE</strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', display: 'block', fontWeight: 600 }}>$0 Delivery Fee</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Hero Graphics Banner */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <div style={{
              width: '100%',
              maxWidth: '380px',
              height: '280px',
              borderRadius: 'var(--radius-lg)',
              backgroundImage: 'url("https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
              border: '2px solid rgba(255, 255, 255, 0.15)',
              position: 'relative'
            }}>
              
              {/* Floating Floating Rating Pill */}
              <div className="glass-panel" style={{
                position: 'absolute',
                bottom: '-20px',
                left: '-20px',
                padding: '12px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <Award style={{ color: 'var(--accent)', width: 28, height: 28 }} />
                <div>
                  <h4 style={{ color: '#FFF', fontSize: '0.95rem' }}>4.9 ★ Rating</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>10,000+ Happy Customers</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

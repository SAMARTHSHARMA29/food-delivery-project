import React, { useState, useEffect } from 'react';
import { fetchAllOrders, updateOrderStatusAPI, fetchAnalyticsAPI } from '../services/api';
import { ShieldCheck, DollarSign, ShoppingBag, Clock, CheckCircle, RefreshCw } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useCart();

  const loadData = async () => {
    setLoading(true);
    const [ordersData, analyticsData] = await Promise.all([
      fetchAllOrders(),
      fetchAnalyticsAPI()
    ]);
    setOrders(ordersData);
    setAnalytics(analyticsData);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    const res = await updateOrderStatusAPI(orderId, newStatus);
    if (res.success) {
      showToast(`Order ${orderId} updated to ${newStatus}! ⚡`, 'success');
      loadData();
    } else {
      showToast(res.message, 'error');
    }
  };

  const getNextStatus = (current) => {
    switch (current) {
      case 'Received': return 'Preparing';
      case 'Preparing': return 'Out for Delivery';
      case 'Out for Delivery': return 'Delivered';
      default: return null;
    }
  };

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '12px',
            background: 'rgba(255, 82, 82, 0.15)',
            border: '1px solid var(--primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <ShieldCheck style={{ width: 24, height: 24, color: 'var(--primary)' }} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: '#FFF' }}>Kitchen & Admin Control Center</h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Manage live customer orders & view store performance</span>
          </div>
        </div>

        <button 
          onClick={loadData}
          className="btn-secondary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <RefreshCw style={{ width: 16, height: 16, animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          <span>Refresh Live Feed</span>
        </button>
      </div>

      {/* Analytics KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        
        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Revenue</span>
            <DollarSign style={{ color: 'var(--secondary)', width: 22, height: 22 }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#FFF' }}>
            ${analytics?.totalRevenue ? analytics.totalRevenue.toFixed(2) : '0.00'}
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>Gross Store Sales</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Orders</span>
            <Clock style={{ color: 'var(--accent)', width: 22, height: 22 }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#FFF' }}>
            {analytics?.activeOrders ?? 0}
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600 }}>In Kitchen / En Route</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Orders</span>
            <ShoppingBag style={{ color: 'var(--primary)', width: 22, height: 22 }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#FFF' }}>
            {analytics?.totalOrders ?? 0}
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Processed Lifetime</span>
        </div>

        <div className="glass-panel" style={{ padding: '20px', borderRadius: 'var(--radius-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Avg Order Value</span>
            <CheckCircle style={{ color: '#60A5FA', width: 22, height: 22 }} />
          </div>
          <h3 style={{ fontSize: '1.8rem', color: '#FFF' }}>
            ${analytics?.avgOrderValue ? analytics.avgOrderValue.toFixed(2) : '0.00'}
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#60A5FA', fontWeight: 600 }}>Per Checkout</span>
        </div>

      </div>

      {/* Orders Table */}
      <div className="glass-panel" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', padding: '24px' }}>
        <h3 style={{ fontSize: '1.2rem', color: '#FFF', marginBottom: '20px' }}>Live Customer Orders Queue</h3>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
            No orders found in the database.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem', color: '#FFF' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-light)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '12px' }}>Order ID</th>
                  <th style={{ padding: '12px' }}>Customer</th>
                  <th style={{ padding: '12px' }}>Destination</th>
                  <th style={{ padding: '12px' }}>Items</th>
                  <th style={{ padding: '12px' }}>Total</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px' }}>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(o => {
                  const nextStatus = getNextStatus(o.status);
                  return (
                    <tr key={o.orderId} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '14px 12px', fontWeight: 700, color: 'var(--accent)' }}>#{o.orderId}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <strong style={{ display: 'block' }}>{o.customerName}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.phone}</span>
                      </td>
                      <td style={{ padding: '14px 12px', color: 'var(--text-muted)', maxWidth: '200px' }}>{o.deliveryAddress}</td>
                      <td style={{ padding: '14px 12px' }}>
                        {o.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </td>
                      <td style={{ padding: '14px 12px', fontWeight: 800, color: 'var(--primary)' }}>
                        ${o.total ? o.total.toFixed(2) : '0.00'}
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          background: o.status === 'Delivered' ? 'rgba(0, 230, 118, 0.15)' : o.status === 'Out for Delivery' ? 'rgba(255, 179, 0, 0.15)' : 'rgba(255, 82, 82, 0.15)',
                          color: o.status === 'Delivered' ? 'var(--secondary)' : o.status === 'Out for Delivery' ? 'var(--accent)' : 'var(--primary)'
                        }}>
                          {o.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        {nextStatus ? (
                          <button
                            onClick={() => handleStatusUpdate(o.orderId, nextStatus)}
                            className="btn-primary"
                            style={{ padding: '6px 12px', fontSize: '0.78rem', borderRadius: '6px' }}
                          >
                            Advance to {nextStatus}
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

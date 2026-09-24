import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { RestaurantCard } from './components/RestaurantCard';
import { FoodItemCard } from './components/FoodItemCard';
import { DishModal } from './components/DishModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastNotification } from './components/ToastNotification';
import { fetchCategories, fetchRestaurants, fetchFoodItems } from './services/api';
import { Store, UtensilsCrossed, ChevronRight, Filter, Sparkles, ArrowLeft } from 'lucide-react';

function AppContent() {
  const [categories, setCategories] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [userAddress, setUserAddress] = useState('742 Evergreen Terrace, Downtown');
  const [isAdminView, setIsAdminView] = useState(false);
  
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedDishForModal, setSelectedDishForModal] = useState(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [vegOnlyFilter, setVegOnlyFilter] = useState(false);

  useEffect(() => {
    const loadInitialData = async () => {
      const [cats, rests, foods] = await Promise.all([
        fetchCategories(),
        fetchRestaurants(),
        fetchFoodItems()
      ]);
      setCategories(cats || []);
      setRestaurants(rests || []);
      setFoodItems(foods || []);
    };
    loadInitialData();
  }, []);

  // Filtered dishes
  const filteredDishes = foodItems.filter(item => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchTerm || item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesVeg = !vegOnlyFilter || item.isVeg;
    const matchesRest = !selectedRestaurant || item.restaurantId === selectedRestaurant.id;
    return matchesCat && matchesSearch && matchesVeg && matchesRest;
  });

  // Filtered restaurants
  const filteredRestaurants = restaurants.filter(rest => {
    const matchesSearch = !searchTerm || rest.name.toLowerCase().includes(searchTerm.toLowerCase()) || rest.cuisines.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = activeCategory === 'all' || rest.cuisines.some(c => c.toLowerCase().includes(activeCategory.toLowerCase()));
    return matchesSearch && matchesCat;
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Navigation */}
      <Navbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        userAddress={userAddress}
        setUserAddress={setUserAddress}
        isAdminView={isAdminView}
        setIsAdminView={setIsAdminView}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {isAdminView ? (
        <AdminDashboard />
      ) : (
        <main style={{ flex: 1, paddingBottom: '60px' }}>
          
          {/* Hero Banner */}
          {!selectedRestaurant && <HeroBanner />}

          {/* Restaurant Detail Banner Header if a restaurant is selected */}
          {selectedRestaurant ? (
            <section style={{ margin: '24px 0 32px 0' }}>
              <div className="container">
                <button 
                  onClick={() => setSelectedRestaurant(null)}
                  className="btn-secondary"
                  style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <ArrowLeft style={{ width: 16, height: 16 }} />
                  <span>Back to All Restaurants</span>
                </button>

                <div className="glass-panel" style={{
                  borderRadius: 'var(--radius-lg)',
                  padding: '32px',
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 0.8fr',
                  gap: '30px',
                  alignItems: 'center'
                }}>
                  <div>
                    <span className="badge-tag badge-popular" style={{ marginBottom: '12px', display: 'inline-block' }}>
                      {selectedRestaurant.badge || 'Featured Kitchen'}
                    </span>
                    <h1 style={{ fontSize: '2.4rem', color: '#FFF', marginBottom: '8px' }}>{selectedRestaurant.name}</h1>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '0.95rem' }}>
                      {selectedRestaurant.description}
                    </p>
                    <div style={{ display: 'flex', gap: '16px', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                      <span>⭐ <strong>{selectedRestaurant.rating}</strong> ({selectedRestaurant.reviewsCount} reviews)</span>
                      <span>🚴 <strong>{selectedRestaurant.deliveryTime}</strong> delivery</span>
                      <span>💵 <strong>${selectedRestaurant.deliveryFee.toFixed(2)}</strong> delivery fee</span>
                    </div>
                  </div>

                  <div style={{
                    height: '180px',
                    borderRadius: 'var(--radius-md)',
                    backgroundImage: `url(${selectedRestaurant.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}></div>
                </div>
              </div>
            </section>
          ) : (
            <CategoryFilter 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          )}

          {/* Restaurant Showcase Grid */}
          {!selectedRestaurant && activeCategory === 'all' && !searchTerm && (
            <section style={{ marginBottom: '48px' }}>
              <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Store style={{ color: 'var(--primary)', width: 22, height: 22 }} />
                    <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>Top Rated Kitchens & Restaurants</h3>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>{filteredRestaurants.length} Restaurants near you</span>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredRestaurants.map(rest => (
                    <RestaurantCard 
                      key={rest.id}
                      restaurant={rest}
                      onSelect={(r) => setSelectedRestaurant(r)}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Food Menu Dishes Section */}
          <section>
            <div className="container">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px',
                paddingBottom: '16px',
                borderBottom: '1px solid var(--border-light)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <UtensilsCrossed style={{ color: 'var(--primary)', width: 22, height: 22 }} />
                  <h3 style={{ fontSize: '1.4rem', color: '#FFF' }}>
                    {selectedRestaurant ? `${selectedRestaurant.name} Menu` : 'Delicious Dishes & Meals'}
                  </h3>
                </div>

                {/* Veg filter toggle pill */}
                <button
                  onClick={() => setVegOnlyFilter(!vegOnlyFilter)}
                  className="btn-secondary"
                  style={{
                    borderColor: vegOnlyFilter ? 'var(--secondary)' : 'var(--border-light)',
                    background: vegOnlyFilter ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    color: vegOnlyFilter ? 'var(--secondary)' : 'var(--text-muted)'
                  }}
                >
                  <Filter style={{ width: 15, height: 15 }} />
                  <span>{vegOnlyFilter ? '🌱 Veg Only Active' : 'Filter Veg Only'}</span>
                </button>
              </div>

              {filteredDishes.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                  <Sparkles style={{ width: 40, height: 40, color: 'var(--text-dim)', marginBottom: '12px' }} />
                  <h3>No dishes match your search or filter</h3>
                  <p style={{ marginTop: '6px', fontSize: '0.9rem' }}>Try searching for burgers, pizza, or clearing your filters.</p>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                  gap: '24px'
                }}>
                  {filteredDishes.map(item => (
                    <FoodItemCard
                      key={item.id}
                      foodItem={item}
                      onCustomize={(food) => setSelectedDishForModal(food)}
                    />
                  ))}
                </div>
              )}

            </div>
          </section>

        </main>
      )}

      {/* Footer */}
      <footer className="glass-header" style={{ borderTop: '1px solid var(--border-light)', padding: '24px 0', marginTop: 'auto' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          <div>
            <strong style={{ color: '#FFF' }}>CRAVEDASH Fullstack MERN Application</strong> • Lightning Speed Food Delivery Engine
          </div>
          <div>
            Built with React, Vite, Node.js, Express & MongoDB
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {selectedDishForModal && (
        <DishModal 
          foodItem={selectedDishForModal}
          onClose={() => setSelectedDishForModal(null)}
        />
      )}

      <CartDrawer 
        userAddress={userAddress}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {isTrackerOpen && (
        <OrderTrackerModal 
          onClose={() => setIsTrackerOpen(false)}
        />
      )}

      <ToastNotification />

    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrowseMaterials from './components/BrowseMaterials';
import ProductCard from './components/ProductCard';
import MaterialDetailsModal from './components/MaterialDetailsModal';
import SellMaterialsModal from './components/SellMaterialsModal';
import AuthModal from './components/AuthModal';
import WishlistModal from './components/WishlistModal';
import MyListingsModal from './components/MyListingsModal';
import Footer from './components/Footer';
import Toast from './components/Toast';

import { INITIAL_MATERIALS, CATEGORIES } from './data/sampleMaterials';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  PlusCircle, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Users, 
  TrendingUp, 
  Smile 
} from 'lucide-react';

export default function App() {
  // 1. Core State
  const [materials, setMaterials] = useState(() => {
    try {
      const saved = localStorage.getItem('bookloop_materials');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MATERIALS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('bookloop_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });

  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('bookloop_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return ['mat-1', 'mat-4']; // Default sample bookmarked items
  });

  // 2. Navigation & Filter State
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'browse'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // 3. Modals & Drawers State
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [isSellModalOpen, setIsSellModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [isMyListingsModalOpen, setIsMyListingsModalOpen] = useState(false);

  // 4. Toast notification state
  const [toast, setToast] = useState(null);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bookloop_materials', JSON.stringify(materials));
    } catch (e) {
      console.error(e);
    }
  }, [materials]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('bookloop_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('bookloop_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('bookloop_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.error(e);
    }
  }, [wishlistIds]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Handlers
  const handleHeroSearch = (query, category) => {
    setSearchQuery(query);
    setSelectedCategory(category);
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (material) => {
    if (wishlistIds.includes(material.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== material.id));
      showToast(`Removed "${material.title}" from saved items`, 'info');
    } else {
      setWishlistIds((prev) => [...prev, material.id]);
      showToast(`Saved "${material.title}" to your Wishlist!`, 'success');
    }
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
    showToast('Your wishlist has been cleared', 'info');
  };

  const handlePublishListing = (newMaterial, isEdit) => {
    if (isEdit) {
      setMaterials((prev) => prev.map((m) => (m.id === newMaterial.id ? newMaterial : m)));
      showToast(`Updated "${newMaterial.title}" successfully!`, 'success');
    } else {
      setMaterials((prev) => [newMaterial, ...prev]);
      showToast(`Published "${newMaterial.title}"! Now visible to all students.`, 'success');
    }
    setEditingListing(null);
  };

  const handleDeleteListing = (id) => {
    const itemToDelete = materials.find((m) => m.id === id);
    if (window.confirm(`Are you sure you want to delete the listing "${itemToDelete?.title || 'this book'}"?`)) {
      setMaterials((prev) => prev.filter((m) => m.id !== id));
      setWishlistIds((prev) => prev.filter((itemId) => itemId !== id));
      if (selectedMaterial?.id === id) setSelectedMaterial(null);
      showToast('Listing removed from BookLoop', 'info');
    }
  };

  const handleStartEdit = (material) => {
    setEditingListing(material);
    setIsSellModalOpen(true);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('You have been signed out', 'info');
  };

  const handleOpenSell = () => {
    setEditingListing(null);
    setIsSellModalOpen(true);
  };

  const userListings = materials.filter(
    (m) => m.isUserListing || (currentUser && m.sellerEmail === currentUser.email)
  );

  const wishlistMaterials = materials.filter((m) => wishlistIds.includes(m.id));

  // Featured items on Homepage (first 4)
  const featuredMaterials = materials.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. Universal Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistModalOpen(true)}
        onOpenSell={handleOpenSell}
        onOpenMyListings={() => setIsMyListingsModalOpen(true)}
      />

      {/* 2. Main Content Views */}
      <main className="flex-1">
        {activeTab === 'home' ? (
          <div>
            {/* Hero Section */}
            <Hero
              onSearchSubmit={handleHeroSearch}
              onBrowseClick={() => {
                setActiveTab('browse');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSellClick={handleOpenSell}
            />

            {/* Featured Study Materials Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">Fresh Deals</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Featured Study Materials
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">
                    Hand-picked semester textbooks and competitive question papers with top discounts.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setActiveTab('browse');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 group"
                >
                  <span>Explore All {materials.length} Materials</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 4 Featured Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                {featuredMaterials.map((material) => (
                  <ProductCard
                    key={material.id}
                    material={material}
                    onViewDetails={(item) => setSelectedMaterial(item)}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistIds.includes(material.id)}
                    isOwner={material.isUserListing || (currentUser && material.sellerEmail === currentUser.email)}
                    onDeleteListing={handleDeleteListing}
                    onEditListing={handleStartEdit}
                  />
                ))}
              </div>
            </section>

            {/* How BookLoop Works Section */}
            <section className="bg-white border-y border-slate-200/80 py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    Simple 3-Step Process
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                    How BookLoop Works for Students
                  </h2>
                  <p className="text-sm text-slate-500 mt-2">
                    Buy or sell study materials safely directly with peers in your campus or city.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Step 1 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 relative">
                    <span className="text-4xl font-black text-blue-100 absolute top-4 right-4">01</span>
                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm shadow-blue-500/20">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Find or List Materials
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Search by course, title, or author. Or list your previous semester books in 2 minutes with zero platform fees.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 relative">
                    <span className="text-4xl font-black text-orange-100 absolute top-4 right-4">02</span>
                    <div className="w-12 h-12 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold mb-4 shadow-sm shadow-orange-500/20">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Connect Directly with Seller
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      No middlemen. Contact student sellers via Phone, WhatsApp, or Email to agree on a convenient meetup point.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 relative">
                    <span className="text-4xl font-black text-emerald-100 absolute top-4 right-4">03</span>
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold mb-4 shadow-sm shadow-emerald-500/20">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">
                      Campus Handover & Save
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Inspect the textbook in person on campus, check page condition, and complete payment smoothly via UPI or cash.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Browse by Major Academic Streams */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Study Materials by Discipline
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                  Find exact books curated for your specific college department or competitive test.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {CATEGORIES.map((cat) => {
                  const count = materials.filter((m) => m.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setActiveTab('browse');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all text-left group flex flex-col justify-between h-32"
                    >
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded self-start">
                        {count} {count === 1 ? 'item' : 'items'}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                          {cat}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                          <span>Browse books</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Sell CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-xl space-y-3 z-10 text-center md:text-left">
                  <span className="inline-block text-xs font-black uppercase tracking-wider text-orange-300 bg-white/10 px-3 py-1 rounded-full">
                    Turn Books into Cash
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                    Have books from last semester collecting dust?
                  </h3>
                  <p className="text-sm sm:text-base text-blue-100 font-normal leading-relaxed">
                    Help a junior save money while recovering up to 60% of your book investment. Free listing with instant student connections.
                  </p>
                </div>

                <div className="z-10 shrink-0">
                  <button
                    onClick={handleOpenSell}
                    className="px-7 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>Sell Your Materials Now</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* Browse Materials Page */
          <BrowseMaterials
            materials={materials}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onViewDetails={(item) => setSelectedMaterial(item)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            currentUserId={currentUser?.email}
            onDeleteListing={handleDeleteListing}
            onEditListing={handleStartEdit}
            onOpenSell={handleOpenSell}
          />
        )}
      </main>

      {/* 3. Universal Footer */}
      <Footer
        onCategoryClick={(cat) => {
          setSelectedCategory(cat);
          setActiveTab('browse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSell={handleOpenSell}
        onOpenBrowse={() => {
          setActiveTab('browse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 4. Modals & Dialogs */}
      {/* Material Details Modal */}
      <MaterialDetailsModal
        material={selectedMaterial}
        isOpen={Boolean(selectedMaterial)}
        onClose={() => setSelectedMaterial(null)}
        isWishlisted={selectedMaterial ? wishlistIds.includes(selectedMaterial.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onContactSeller={() => {}}
      />

      {/* Sell Your Materials Modal */}
      <SellMaterialsModal
        isOpen={isSellModalOpen}
        onClose={() => {
          setIsSellModalOpen(false);
          setEditingListing(null);
        }}
        currentUser={currentUser}
        onPublishListing={handlePublishListing}
        editingListing={editingListing}
      />

      {/* Auth Modal (Login / Sign Up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Wishlist Drawer/Modal */}
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        wishlistMaterials={wishlistMaterials}
        onRemoveFromWishlist={(id) => {
          const item = materials.find((m) => m.id === id);
          if (item) handleToggleWishlist(item);
        }}
        onClearWishlist={handleClearWishlist}
        onViewDetails={(item) => setSelectedMaterial(item)}
        onBrowseClick={() => {
          setActiveTab('browse');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* My Listings Modal */}
      <MyListingsModal
        isOpen={isMyListingsModalOpen}
        onClose={() => setIsMyListingsModalOpen(false)}
        userListings={userListings}
        onEditListing={handleStartEdit}
        onDeleteListing={handleDeleteListing}
        onOpenSellNew={handleOpenSell}
        onViewDetails={(item) => setSelectedMaterial(item)}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

    </div>
  );
}

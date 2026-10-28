import React, { useState } from 'react';
import { BookOpen, Repeat, Heart, PlusCircle, User, LogOut, Package, Menu, X } from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onOpenAuth,
  onLogout,
  wishlistCount,
  onOpenWishlist,
  onOpenSell,
  onOpenMyListings
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="relative flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
                <Repeat className="w-3.5 h-3.5 text-orange-400 absolute -bottom-1 -right-1 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                  Book<span className="text-blue-600">Loop</span>
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
              </div>
              <p className="text-[10px] sm:text-xs font-medium text-slate-500 tracking-wide">
                Read More. Spend Less.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('browse')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'browse'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Browse Materials
            </button>
            <button
              onClick={onOpenSell}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-orange-500" />
              Sell Your Materials
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-blue-600 hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Auth / User Profile */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-slate-800"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold leading-tight max-w-[100px] truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 leading-tight">Student Seller</p>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-medium text-slate-500">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        onOpenMyListings();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
                    >
                      <Package className="w-4 h-4 text-slate-400" />
                      My Listings
                    </button>

                    <button
                      onClick={() => {
                        onOpenWishlist();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 flex items-center gap-2.5 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-slate-400" />
                      Wishlist ({wishlistCount})
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        onLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-sm shadow-blue-500/20 transition-all"
              >
                <User className="w-4 h-4" />
                Login / Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu & Wishlist Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => handleNavClick('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'home' ? 'text-blue-600 bg-blue-50 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('browse')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              activeTab === 'browse' ? 'text-blue-600 bg-blue-50 font-bold' : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Browse Materials
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSell();
            }}
            className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-orange-500" />
            Sell Your Materials
          </button>

          {currentUser ? (
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="px-4 py-2 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 font-medium">Logged in as</p>
                <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                <p className="text-xs text-slate-600">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyListings();
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2"
              >
                <Package className="w-4 h-4 text-blue-600" />
                My Published Listings
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 rounded-lg text-sm font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full py-2.5 rounded-xl text-center font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login / Sign Up
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

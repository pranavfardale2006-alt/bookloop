import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { CATEGORIES, CONDITIONS } from '../data/sampleMaterials';
import { Search, SlidersHorizontal, ArrowUpDown, RotateCcw, BookX, PlusCircle } from 'lucide-react';

export default function BrowseMaterials({
  materials,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onViewDetails,
  onToggleWishlist,
  wishlistIds,
  currentUserId,
  onDeleteListing,
  onEditListing,
  onOpenSell
}) {
  const [selectedCondition, setSelectedCondition] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Filter and sort computation
  const filteredMaterials = useMemo(() => {
    return materials.filter((item) => {
      // Search matching (title, author, subject/description, category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesAuthor = item.author.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = (item.description || '').toLowerCase().includes(query);
        if (!matchesTitle && !matchesAuthor && !matchesCategory && !matchesDesc) {
          return false;
        }
      }

      // Category matching
      if (selectedCategory && item.category !== selectedCategory) {
        return false;
      }

      // Condition matching
      if (selectedCondition && item.condition !== selectedCondition) {
        return false;
      }

      // Price range matching
      if (priceRange) {
        if (priceRange === 'under-200' && item.price >= 200) return false;
        if (priceRange === '200-500' && (item.price < 200 || item.price > 500)) return false;
        if (priceRange === '500-1000' && (item.price < 500 || item.price > 1000)) return false;
        if (priceRange === 'above-1000' && item.price <= 1000) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
        const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
        return discB - discA;
      }
      // 'newest' default
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
  }, [materials, searchQuery, selectedCategory, selectedCondition, priceRange, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedCondition('');
    setPriceRange('');
    setSortBy('newest');
  };

  const hasActiveFilters = Boolean(
    searchQuery || selectedCategory || selectedCondition || priceRange || sortBy !== 'newest'
  );

  return (
    <div id="browse-materials-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Browse Study Materials
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Explore verified second-hand books, notes, and preparation guides from fellow students.
          </p>
        </div>

        {/* Real-time search inside browse */}
        <div className="w-full md:w-80 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, topic..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider / Filter */}
      <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-2 min-w-max">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            All Categories ({materials.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = materials.filter((m) => m.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(isSelected ? '' : cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {cat} <span className="opacity-70 text-xs ml-1">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Filter Selects */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          {/* Condition Filter */}
          <select
            value={selectedCondition}
            onChange={(e) => setSelectedCondition(e.target.value)}
            className="text-xs sm:text-sm py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="">All Conditions</option>
            {CONDITIONS.map((cond) => (
              <option key={cond.value} value={cond.value}>
                {cond.label}
              </option>
            ))}
          </select>

          {/* Price Range Filter */}
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="text-xs sm:text-sm py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="">Any Price</option>
            <option value="under-200">Under ₹200</option>
            <option value="200-500">₹200 - ₹500</option>
            <option value="500-1000">₹500 - ₹1000</option>
            <option value="above-1000">Above ₹1000</option>
          </select>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>

        {/* Right Sort Controls */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs sm:text-sm py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-semibold focus:outline-hidden focus:border-blue-500 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 mb-6">
        <p>
          Showing <span className="font-bold text-slate-900">{filteredMaterials.length}</span> study materials
          {selectedCategory && (
            <span> in <strong className="text-blue-600">{selectedCategory}</strong></span>
          )}
        </p>

        {hasActiveFilters && (
          <p className="text-xs text-slate-400">
            Filtered results
          </p>
        )}
      </div>

      {/* Product Cards Grid or Empty State */}
      {filteredMaterials.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {filteredMaterials.map((material) => (
            <ProductCard
              key={material.id}
              material={material}
              onViewDetails={onViewDetails}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(material.id)}
              isOwner={material.isUserListing || (material.sellerEmail && material.sellerEmail === currentUserId)}
              onDeleteListing={onDeleteListing}
              onEditListing={onEditListing}
            />
          ))}
        </div>
      ) : (
        /* Friendly Empty State */
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
            <BookX className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
            No Study Materials Found
          </h3>
          <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto">
            We couldn't find any listings matching your current search or filter combination.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleResetFilters}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Reset All Filters
            </button>
            <button
              onClick={onOpenSell}
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              List This Book Instead
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

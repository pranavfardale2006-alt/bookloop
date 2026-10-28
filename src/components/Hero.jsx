import React, { useState } from 'react';
import { Search, ArrowRight, PlusCircle, ShieldCheck, Banknote, Sparkles, GraduationCap } from 'lucide-react';
import { CATEGORIES } from '../data/sampleMaterials';

export default function Hero({ onSearchSubmit, onBrowseClick, onSellClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(searchQuery, selectedCategory);
  };

  const handleQuickCategory = (cat) => {
    setSelectedCategory(cat);
    onSearchSubmit(searchQuery, cat);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 pt-10 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200/60">
      
      {/* Decorative Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-orange-200/25 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Student Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-blue-200/80 shadow-xs mb-6">
          <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            India's #1 Student Book Exchange
          </span>
          <span className="text-xs text-slate-400">•</span>
          <span className="text-xs font-semibold text-slate-600">“Read More. Spend Less.”</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-5">
          Buy & Sell Study Materials at <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">Affordable</span> <span className="text-orange-500">Prices</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-600 font-normal leading-relaxed mb-8">
          Give your old books a new home. Find affordable college textbooks, competitive exam guides, and topper notes while saving up to 75% of your semester budget.
        </p>

        {/* Main Search Bar Form */}
        <div className="max-w-3xl mx-auto mb-8">
          <form 
            onSubmit={handleSubmit}
            className="bg-white p-2 sm:p-2.5 rounded-2xl shadow-xl shadow-blue-900/5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-2"
          >
            {/* Search Input */}
            <div className="relative w-full flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by book title, author, or subject..."
                className="w-full pl-11 pr-3 py-3 rounded-xl text-sm sm:text-base text-slate-800 placeholder-slate-400 bg-transparent focus:outline-hidden focus:ring-0"
              />
            </div>

            {/* Category Select Dropdown */}
            <div className="w-full sm:w-56 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200 pl-0 sm:pl-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl text-xs sm:text-sm text-slate-700 bg-transparent focus:outline-hidden cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Submit Button */}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-600/25 shrink-0"
            >
              <span>Search</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-10">
          <button
            onClick={onBrowseClick}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center gap-2"
          >
            <span>Browse Materials</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onSellClick}
            className="px-6 py-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 font-bold text-sm sm:text-base active:scale-95 transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4 text-orange-500" />
            <span>Sell Your Materials</span>
          </button>
        </div>

        {/* Quick Category Chips */}
        <div className="pt-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Popular Subjects & Categories
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => handleQuickCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-slate-200/60 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Up to 75% Savings</p>
              <p className="text-[11px] text-slate-500">Pocket-friendly prices in ₹</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60">
            <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Student-to-Student</p>
              <p className="text-[11px] text-slate-500">Direct campus connections</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Verified Condition</p>
              <p className="text-[11px] text-slate-500">Inspect before handover</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

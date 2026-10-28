import React, { useState } from 'react';
import { Heart, MapPin, BookOpen, Trash2, Edit3, ArrowUpRight } from 'lucide-react';

export default function ProductCard({
  material,
  onViewDetails,
  onToggleWishlist,
  isWishlisted,
  isOwner,
  onDeleteListing,
  onEditListing
}) {
  const [imageError, setImageError] = useState(false);

  const getConditionColor = (cond) => {
    switch (cond) {
      case 'Like New':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Acceptable':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const discountPercent = material.originalPrice && material.originalPrice > material.price
    ? Math.round(((material.originalPrice - material.price) / material.originalPrice) * 100)
    : null;

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full overflow-hidden">
      
      {/* Top Image Container */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => onViewDetails(material)}>
        {material.image && !imageError ? (
          <img
            src={material.image}
            alt={material.title}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600">
            <BookOpen className="w-12 h-12 stroke-[1.5] mb-2 opacity-80" />
            <span className="text-xs font-bold text-center text-slate-700 line-clamp-2 px-2">
              {material.title}
            </span>
          </div>
        )}

        {/* Condition Badge */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs backdrop-blur-xs ${getConditionColor(material.condition)}`}>
            {material.condition}
          </span>
          {discountPercent && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-orange-500 text-white shadow-2xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(material);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-transform active:scale-90 ${
            isWishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white stroke-white' : 'stroke-current'}`} />
        </button>

        {/* Category Pill Over Image */}
        <div className="absolute bottom-2 left-3 right-3">
          <span className="inline-block text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-900/70 text-white backdrop-blur-xs">
            {material.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        
        {/* Title */}
        <h3 
          onClick={() => onViewDetails(material)}
          className="text-base font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors cursor-pointer mb-1 leading-snug"
          title={material.title}
        >
          {material.title}
        </h3>

        {/* Author */}
        <p className="text-xs text-slate-500 line-clamp-1 mb-3">
          By <span className="font-medium text-slate-700">{material.author}</span>
        </p>

        {/* Location & Seller snippet */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-4">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{material.sellerLocation || 'Campus Pickup'}</span>
        </div>

        {/* Price & Action Row */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Price Block */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl sm:text-2xl font-black text-slate-900">
                ₹{material.price}
              </span>
              {material.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{material.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              Second-Hand Price
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={() => onViewDetails(material)}
            className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1 active:scale-95 shadow-2xs"
          >
            <span>Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Owner Management Bar */}
        {isOwner && (
          <div className="mt-3 pt-2 border-t border-dashed border-slate-200 flex items-center justify-between text-xs">
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Your Listing
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onEditListing(material)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 transition-colors"
                title="Edit listing"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDeleteListing(material.id)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                title="Delete listing"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

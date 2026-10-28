import React from 'react';
import { X, Heart, Trash2, ArrowRight, BookOpen, ShoppingBag } from 'lucide-react';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistMaterials,
  onRemoveFromWishlist,
  onClearWishlist,
  onViewDetails,
  onBrowseClick
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Your Saved Materials ({wishlistMaterials.length})
              </h3>
              <p className="text-xs text-slate-500">Books and notes you've bookmarked for this semester</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {wishlistMaterials.length > 0 && (
              <button
                onClick={onClearWishlist}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 space-y-4">
          {wishlistMaterials.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {wishlistMaterials.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div 
                      onClick={() => {
                        onClose();
                        onViewDetails(item);
                      }}
                      className="w-16 h-20 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 cursor-pointer shadow-2xs"
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600">
                          <BookOpen className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                      <h4 
                        onClick={() => {
                          onClose();
                          onViewDetails(item);
                        }}
                        className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer mt-0.5"
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">By {item.author}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-black text-slate-900">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="text-[11px] text-slate-400 line-through">₹{item.originalPrice}</span>
                        )}
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                          {item.condition}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onViewDetails(item);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-bold transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-400 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Your wishlist is empty
              </h4>
              <p className="text-xs text-slate-500 mb-5">
                Save study materials and textbooks here to keep track of them while you prepare for your exams.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBrowseClick();
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <span>Browse Materials</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistMaterials.length > 0 && (
          <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-xs text-slate-500">
              Total Wishlist Value:{' '}
              <strong className="text-slate-900 font-bold">
                ₹{wishlistMaterials.reduce((sum, item) => sum + item.price, 0)}
              </strong>
            </span>
            <button
              onClick={() => {
                onClose();
                onBrowseClick();
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

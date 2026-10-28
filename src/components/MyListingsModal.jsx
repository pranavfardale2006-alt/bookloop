import React from 'react';
import { X, Package, PlusCircle, Edit3, Trash2, Eye, MapPin, CheckCircle2 } from 'lucide-react';

export default function MyListingsModal({
  isOpen,
  onClose,
  userListings,
  onEditListing,
  onDeleteListing,
  onOpenSellNew,
  onViewDetails
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                My Listed Materials ({userListings.length})
              </h3>
              <p className="text-xs text-slate-500">Manage and update your active student listings</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenSellNew();
              }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-colors shadow-2xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List New Material</span>
            </button>
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
          {userListings.length > 0 ? (
            <div className="space-y-3">
              {userListings.map((item) => (
                <div 
                  key={item.id} 
                  className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-20 rounded-xl object-cover border border-slate-200 shrink-0 cursor-pointer"
                      onClick={() => {
                        onClose();
                        onViewDetails(item);
                      }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Live on BookLoop
                        </span>
                      </div>
                      <h4 
                        onClick={() => {
                          onClose();
                          onViewDetails(item);
                        }}
                        className="text-sm font-bold text-slate-900 truncate hover:text-blue-600 cursor-pointer"
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">By {item.author}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs">
                        <span className="font-extrabold text-slate-900 text-sm">₹{item.price}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-600 font-medium">{item.condition}</span>
                        <span className="text-slate-400">•</span>
                        <span className="text-slate-500 text-[11px] flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.sellerLocation || 'Campus Pickup'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                    <button
                      onClick={() => {
                        onClose();
                        onViewDetails(item);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onEditListing(item);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => onDeleteListing(item.id)}
                      className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                      title="Delete listing"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center max-w-sm mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                You haven't listed any books yet
              </h4>
              <p className="text-xs text-slate-500 mb-5">
                Have last semester's textbooks, handwritten notes, or entrance exam question banks? Turn them into cash today!
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenSellNew();
                }}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors inline-flex items-center gap-1.5 shadow-sm"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Publish Your First Listing</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

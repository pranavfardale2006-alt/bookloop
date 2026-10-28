import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Heart, 
  Share2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  BookOpen, 
  Calendar, 
  Check, 
  Copy, 
  AlertTriangle 
} from 'lucide-react';

export default function MaterialDetailsModal({
  material,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onContactSeller
}) {
  const [imageError, setImageError] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  if (!isOpen || !material) return null;

  const discountPercent = material.originalPrice && material.originalPrice > material.price
    ? Math.round(((material.originalPrice - material.price) / material.originalPrice) * 100)
    : null;

  const savingsAmount = material.originalPrice && material.originalPrice > material.price
    ? material.originalPrice - material.price
    : null;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Sticky Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-10">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Browse</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWishlist(material)}
              className={`p-2 rounded-xl border border-slate-200 transition-all ${
                isWishlisted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Image & Badges (5 cols) */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-3/4 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden shadow-inner">
                {material.image && !imageError ? (
                  <img
                    src={material.image}
                    alt={material.title}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-indigo-100 text-blue-600 text-center">
                    <BookOpen className="w-16 h-16 stroke-[1.5] mb-3 opacity-80" />
                    <p className="text-sm font-bold text-slate-800">{material.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{material.author}</p>
                  </div>
                )}

                <div className="absolute top-3 left-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs ${getConditionColor(material.condition)}`}>
                    Condition: {material.condition}
                  </span>
                </div>
              </div>

              {/* Safety notice for students */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 text-xs text-blue-800">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong>BookLoop Student Safety:</strong> Meet in public campus spots (library, student canteen) and verify pages before payment.
                </p>
              </div>
            </div>

            {/* Right Column: Title, Details, Price & Seller (7 cols) */}
            <div className="md:col-span-7 flex flex-col">
              
              {/* Category & Edition */}
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  {material.category}
                </span>
                {material.edition && (
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {material.edition}
                  </span>
                )}
              </div>

              {/* Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug mb-2">
                {material.title}
              </h1>

              {/* Author */}
              <p className="text-sm text-slate-600 mb-5">
                Authored by <strong className="text-slate-900 font-semibold">{material.author}</strong>
              </p>

              {/* Price Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50/40 border border-slate-200/90 mb-6 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{material.price}
                    </span>
                    {material.originalPrice && (
                      <span className="text-base text-slate-400 line-through">
                        ₹{material.originalPrice}
                      </span>
                    )}
                  </div>
                  {savingsAmount && (
                    <p className="text-xs font-bold text-emerald-700 mt-0.5">
                      You save ₹{savingsAmount} ({discountPercent}% less than new book MRP)
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setShowContactModal(true)}
                  className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-orange-500/25 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Contact Seller</span>
                </button>
              </div>

              {/* Material Condition Details */}
              <div className="mb-6 p-4 rounded-xl border border-slate-200 bg-white">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Condition Details
                </h4>
                <div className="flex items-start gap-2">
                  <div className={`w-3 h-3 rounded-full mt-1 shrink-0 ${
                    material.condition === 'Like New' ? 'bg-emerald-500' :
                    material.condition === 'Good' ? 'bg-blue-500' : 'bg-amber-500'
                  }`} />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{material.condition}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {material.conditionNote || "Inspected by student seller. Clean readable text, all pages intact."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Description & Course Info
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {material.description || "No additional description provided by the seller."}
                </p>
              </div>

              {/* Seller Information Card */}
              <div className="mt-auto p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Seller Information
                </h4>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-base shadow-xs">
                      {material.sellerName ? material.sellerName[0].toUpperCase() : 'S'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-slate-900">{material.sellerName}</p>
                        <ShieldCheck className="w-4 h-4 text-emerald-500" title="Verified Student" />
                      </div>
                      <p className="text-xs text-slate-500">{material.sellerRole || "Student Seller"}</p>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        <span>{material.sellerLocation || "Campus Exchange"}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowContactModal(true)}
                    className="px-3.5 py-2 rounded-xl border border-blue-600 text-blue-600 hover:bg-blue-50 text-xs font-bold transition-colors"
                  >
                    View Contacts
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Action Bar */}
        <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={() => setShowContactModal(true)}
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Connect with {material.sellerName?.split(' ')[0] || 'Seller'}</span>
          </button>
        </div>

      </div>

      {/* Sub-Modal: Direct Contact Seller Popup */}
      {showContactModal && (
        <div 
          className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setShowContactModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900">
                Contact {material.sellerName}
              </h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-5">
              Regarding listing: <strong>"{material.title}"</strong> priced at <strong>₹{material.price}</strong>.
            </p>

            <div className="space-y-3 mb-6">
              {/* Phone / Call */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Phone Number</p>
                    <p className="text-sm font-bold text-slate-900">{material.sellerPhone || "+91 98765 43210"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(material.sellerPhone || "+91 98765 43210", 'phone')}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 text-xs font-semibold"
                    title="Copy number"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`tel:${material.sellerPhone || "+919876543210"}`}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700"
                  >
                    Call
                  </a>
                </div>
              </div>

              {/* WhatsApp Chat */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">WhatsApp</p>
                    <p className="text-sm font-bold text-slate-900">Direct Chat</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${(material.sellerPhone || '919876543210').replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(material.sellerName)},%20I%20saw%20your%20listing%20for%20"${encodeURIComponent(material.title)}"%20on%20BookLoop.%20Is%20it%20still%20available?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700"
                >
                  Chat on WhatsApp
                </a>
              </div>

              {/* Email */}
              <div className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-medium">Email Address</p>
                    <p className="text-xs font-bold text-slate-900 truncate max-w-[180px]">{material.sellerEmail || "seller@bookloop.in"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopy(material.sellerEmail || "seller@bookloop.in", 'email')}
                    className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-blue-600 text-xs font-semibold"
                    title="Copy email"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <a
                    href={`mailto:${material.sellerEmail || 'seller@bookloop.in'}?subject=BookLoop%20Inquiry:%20${encodeURIComponent(material.title)}`}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs hover:bg-blue-700"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                Please verify condition in person or ask for a short video preview before transferring any money via UPI.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

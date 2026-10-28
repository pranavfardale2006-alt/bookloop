import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle2, AlertCircle, Sparkles, BookOpen, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/sampleMaterials';

const PRESET_COVERS = [
  { label: 'Engineering/Tech', url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80' },
  { label: 'Computer Code', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80' },
  { label: 'Medical Science', url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80' },
  { label: 'Exam Prep Notes', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80' },
  { label: 'Commerce & Books', url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80' },
  { label: 'Class Textbooks', url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80' }
];

export default function SellMaterialsModal({
  isOpen,
  onClose,
  currentUser,
  onPublishListing,
  editingListing = null
}) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    edition: '',
    category: CATEGORIES[0],
    condition: 'Good',
    conditionNote: '',
    price: '',
    originalPrice: '',
    description: '',
    sellerName: currentUser?.name || '',
    sellerPhone: '',
    sellerEmail: currentUser?.email || '',
    sellerLocation: '',
    image: PRESET_COVERS[0].url
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [imagePreview, setImagePreview] = useState(PRESET_COVERS[0].url);

  useEffect(() => {
    if (editingListing) {
      setFormData({
        title: editingListing.title || '',
        author: editingListing.author || '',
        edition: editingListing.edition || '',
        category: editingListing.category || CATEGORIES[0],
        condition: editingListing.condition || 'Good',
        conditionNote: editingListing.conditionNote || '',
        price: editingListing.price ? String(editingListing.price) : '',
        originalPrice: editingListing.originalPrice ? String(editingListing.originalPrice) : '',
        description: editingListing.description || '',
        sellerName: editingListing.sellerName || (currentUser?.name || ''),
        sellerPhone: editingListing.sellerPhone || '',
        sellerEmail: editingListing.sellerEmail || (currentUser?.email || ''),
        sellerLocation: editingListing.sellerLocation || '',
        image: editingListing.image || PRESET_COVERS[0].url
      });
      setImagePreview(editingListing.image || PRESET_COVERS[0].url);
    } else {
      setFormData({
        title: '',
        author: '',
        edition: '',
        category: CATEGORIES[0],
        condition: 'Good',
        conditionNote: '',
        price: '',
        originalPrice: '',
        description: '',
        sellerName: currentUser?.name || '',
        sellerPhone: '',
        sellerEmail: currentUser?.email || '',
        sellerLocation: '',
        image: PRESET_COVERS[0].url
      });
      setImagePreview(PRESET_COVERS[0].url);
    }
    setErrors({});
    setIsSubmitted(false);
  }, [editingListing, currentUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be less than 5MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (url) => {
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Material title is required';
    if (!formData.author.trim()) newErrors.author = 'Author or source is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.condition) newErrors.condition = 'Condition is required';
    if (!formData.description.trim()) newErrors.description = 'Please add a brief description or syllabus/chapter notes';
    
    const parsedPrice = parseFloat(formData.price);
    if (!formData.price || isNaN(parsedPrice) || parsedPrice <= 0) {
      newErrors.price = 'Please enter a valid price in ₹ (e.g. 250)';
    }

    if (formData.originalPrice) {
      const parsedMRP = parseFloat(formData.originalPrice);
      if (parsedMRP < parsedPrice) {
        newErrors.originalPrice = 'Original MRP should typically be higher than your used price';
      }
    }

    if (!formData.sellerName.trim()) newErrors.sellerName = 'Your name is required';
    if (!formData.sellerPhone.trim() && !formData.sellerEmail.trim()) {
      newErrors.contact = 'Please provide either a contact phone number or email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newMaterial = {
      id: editingListing ? editingListing.id : `user-${Date.now()}`,
      title: formData.title.trim(),
      author: formData.author.trim(),
      edition: formData.edition.trim() || 'Student Edition',
      category: formData.category,
      condition: formData.condition,
      conditionNote: formData.conditionNote.trim() || `${formData.condition} condition. Verified clean pages.`,
      price: Math.round(parseFloat(formData.price)),
      originalPrice: formData.originalPrice ? Math.round(parseFloat(formData.originalPrice)) : null,
      description: formData.description.trim(),
      sellerName: formData.sellerName.trim(),
      sellerPhone: formData.sellerPhone.trim() || '+91 98765 43210',
      sellerEmail: formData.sellerEmail.trim() || (currentUser?.email || 'student@bookloop.in'),
      sellerLocation: formData.sellerLocation.trim() || 'Campus Exchange',
      sellerRole: 'Student Seller',
      image: formData.image || PRESET_COVERS[0].url,
      isUserListing: true,
      createdAt: editingListing ? editingListing.createdAt : new Date().toISOString().split('T')[0]
    };

    onPublishListing(newMaterial, Boolean(editingListing));
    setIsSubmitted(true);

    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-auto flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
          <div>
            <h3 className="text-xl font-bold text-slate-900">
              {editingListing ? 'Edit Study Material Listing' : 'Sell Your Study Materials'}
            </h3>
            <p className="text-xs text-slate-500">
              List textbooks, notes, or question papers in under 2 minutes. Free & zero commission.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        {isSubmitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              Listing {editingListing ? 'Updated' : 'Published'} Successfully!
            </h3>
            <p className="text-sm text-slate-600 max-w-md">
              Your study material is now live on BookLoop. Other students can discover it, view your details, and contact you directly.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                Redirecting to browse...
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* Top Error Alert if any */}
            {Object.keys(errors).length > 0 && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>Please fill in all required fields marked in red below.</span>
              </div>
            )}

            {/* Section 1: Book Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                1. Material Information
              </h4>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Material Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Higher Engineering Mathematics or Made Easy GATE Notes"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-hidden ${
                    errors.title ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.title && <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Author / Publication *
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="e.g. Dr. B.S. Grewal / Topper Notes"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-hidden ${
                      errors.author ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.author && <p className="text-[11px] text-red-500 mt-1">{errors.author}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Edition / Year (Optional)
                  </label>
                  <input
                    type="text"
                    name="edition"
                    value={formData.edition}
                    onChange={handleChange}
                    placeholder="e.g. 44th Edition (2023) or 5th Sem Notes"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-hidden focus:border-blue-500 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 bg-white focus:outline-hidden focus:border-blue-500 cursor-pointer"
                  >
                    {CONDITIONS.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label} ({c.value === 'Like New' ? 'No marks, clean' : c.value === 'Good' ? 'Minor highlights' : 'Used & readable'})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Condition Notes
                </label>
                <input
                  type="text"
                  name="conditionNote"
                  value={formData.conditionNote}
                  onChange={handleChange}
                  placeholder="e.g. Pencil notes in chapter 3, binding is tight, all pages intact"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Description *
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mention course code, semester usefulness, solved question papers included, etc."
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-hidden ${
                    errors.description ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
                {errors.description && <p className="text-[11px] text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>

            {/* Section 2: Pricing */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                2. Pricing in Indian Rupees (₹)
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Selling Price (₹) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      name="price"
                      min="1"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="350"
                      className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm font-bold text-slate-900 focus:outline-hidden ${
                        errors.price ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    />
                  </div>
                  {errors.price && <p className="text-[11px] text-red-500 mt-1">{errors.price}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Original MRP (₹) (Optional, for discount badge)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
                    <input
                      type="number"
                      name="originalPrice"
                      min="1"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="790"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                  {errors.originalPrice && <p className="text-[11px] text-red-500 mt-1">{errors.originalPrice}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Material Cover Image */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                3. Material Photos
              </h4>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Preview Box */}
                <div className="w-24 h-32 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-inner flex items-center justify-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Book cover preview" className="w-full h-full object-cover" />
                  ) : (
                    <BookOpen className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                {/* File Upload Box */}
                <div className="flex-1 w-full">
                  <label className="cursor-pointer block border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                    <Upload className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                    <span className="text-xs font-bold text-slate-800 block">
                      Upload from phone or computer
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      PNG, JPG or WEBP up to 5MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Preset quick cover selectors */}
              <div>
                <p className="text-[11px] font-semibold text-slate-400 mb-1.5">
                  Or select a standard textbook cover:
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COVERS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSelectPreset(preset.url)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                        formData.image === preset.url
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Seller Info */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-1 border-b border-slate-100">
                4. Your Contact Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="sellerName"
                    value={formData.sellerName}
                    onChange={handleChange}
                    placeholder="e.g. Priya Sharma"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 focus:outline-hidden ${
                      errors.sellerName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-blue-500'
                    }`}
                  />
                  {errors.sellerName && <p className="text-[11px] text-red-500 mt-1">{errors.sellerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Campus / City Location
                  </label>
                  <input
                    type="text"
                    name="sellerLocation"
                    value={formData.sellerLocation}
                    onChange={handleChange}
                    placeholder="e.g. North Campus, Delhi or Pune City"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    name="sellerPhone"
                    value={formData.sellerPhone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Email Address
                  </label>
                  <input
                    type="email"
                    name="sellerEmail"
                    value={formData.sellerEmail}
                    onChange={handleChange}
                    placeholder="you@college.edu or gmail"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-hidden focus:border-blue-500"
                  />
                </div>
              </div>

              {errors.contact && <p className="text-[11px] text-red-500 mt-1">{errors.contact}</p>}
            </div>

            {/* Bottom Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-sm font-bold shadow-md shadow-orange-500/20 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{editingListing ? 'Update Listing' : 'Publish Listing'}</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

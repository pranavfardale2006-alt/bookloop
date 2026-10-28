import React, { useState } from 'react';
import { BookOpen, Repeat, Mail, Phone, MapPin, Heart, ShieldCheck, X } from 'lucide-react';
import { CATEGORIES } from '../data/sampleMaterials';

export default function Footer({ onCategoryClick, onOpenSell, onOpenBrowse }) {
  const [activeModal, setActiveModal] = useState(null);

  const closeModal = () => setActiveModal(null);

  return (
    <>
      <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-slate-800">
            
            {/* Col 1 & 2: Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <div className="relative flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                    <Repeat className="w-3.5 h-3.5 text-orange-400 absolute -bottom-1 -right-1 stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-white">
                    Book<span className="text-blue-400">Loop</span>
                  </span>
                  <p className="text-xs text-slate-400 font-medium">Read More. Spend Less.</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
                BookLoop is India's dedicated peer-to-peer student marketplace for second-hand textbooks, college reference guides, handwritten notes, and competitive entrance preparation papers.
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero commission • Direct campus peer exchange</span>
              </div>
            </div>

            {/* Col 3: Quick Navigation */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Explore
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={onOpenBrowse}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Browse All Materials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={onOpenSell}
                    className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                    Sell Your Materials
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('about')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    About BookLoop
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('contact')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Contact Support
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Popular Categories */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Categories
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                {CATEGORIES.slice(0, 5).map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => onCategoryClick(cat)}
                      className="hover:text-blue-400 transition-colors truncate max-w-full text-left"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Legal & Trust */}
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
                Safety & Policies
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button 
                    onClick={() => setActiveModal('privacy')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('terms')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Terms & Conditions
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal('safety')}
                    className="hover:text-blue-400 transition-colors"
                  >
                    Student Exchange Guidelines
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              Copyright © 2026 BookLoop. Built for students across India. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" /> for affordable education.
            </p>
          </div>

        </div>
      </footer>

      {/* Information Modals */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-800 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {activeModal === 'about' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">About BookLoop</h3>
                <p className="text-xs font-semibold text-blue-600 mb-4">“Read More. Spend Less.”</p>
                <div className="text-xs sm:text-sm text-slate-600 space-y-3 leading-relaxed">
                  <p>
                    BookLoop was created to solve the rising cost of higher education textbooks. Every year, millions of students buy expensive engineering, medical, and competitive books only to leave them unused after the semester exams.
                  </p>
                  <p>
                    Our platform allows seniors to pass their study materials, handwritten notes, and solved question sets to juniors at reasonable, second-hand prices (in ₹).
                  </p>
                  <p>
                    By connecting directly on campus, students save up to 75% while keeping quality study resources in circulation.
                  </p>
                </div>
              </div>
            )}

            {activeModal === 'contact' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Contact Us</h3>
                <p className="text-xs text-slate-500 mb-4">Have feedback, questions, or need help with a listing?</p>
                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-[11px] text-slate-400">Email Support</p>
                      <p className="font-bold text-slate-800">support@bookloop.in</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-[11px] text-slate-400">Student Helpline (Mon-Sat, 9am - 7pm)</p>
                      <p className="font-bold text-slate-800">+91 1800-BOOK-LOOP</p>
                    </div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    <div>
                      <p className="text-[11px] text-slate-400">Campus HQ</p>
                      <p className="font-bold text-slate-800">Hauz Khas, New Delhi, 110016</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModal === 'privacy' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Privacy Policy</h3>
                <div className="text-xs text-slate-600 space-y-2.5 max-h-80 overflow-y-auto pr-2 leading-relaxed">
                  <p><strong>1. Information Collection:</strong> BookLoop collects standard contact information provided by sellers (name, email, phone number) purely to facilitate buyer-seller communication for study materials.</p>
                  <p><strong>2. Contact Visibility:</strong> When you publish a book listing, your provided contact phone number or email will be accessible to interested student buyers.</p>
                  <p><strong>3. Data Protection:</strong> We do not sell your personal information or contact details to third-party telemarketers.</p>
                  <p><strong>4. Local Storage:</strong> This prototype uses browser local storage to save your wishlist and current session listings securely on your device.</p>
                </div>
              </div>
            )}

            {activeModal === 'terms' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Terms and Conditions</h3>
                <div className="text-xs text-slate-600 space-y-2.5 max-h-80 overflow-y-auto pr-2 leading-relaxed">
                  <p><strong>1. Genuine Materials:</strong> Sellers agree to list only genuine study materials, textbooks, notes, and preparation guides. Pirated photocopies of current proprietary test software are prohibited.</p>
                  <p><strong>2. Accurate Condition:</strong> Sellers must honestly specify condition (Like New, Good, Acceptable) and any missing pages or highlighting.</p>
                  <p><strong>3. Fair Pricing:</strong> Prices must be quoted in Indian Rupees (₹) and should represent reasonable second-hand educational rates.</p>
                  <p><strong>4. Disclaimer:</strong> BookLoop is a communication facilitator. Financial transactions occur directly between buyers and sellers upon physical book inspection.</p>
                </div>
              </div>
            )}

            {activeModal === 'safety' && (
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Student Safety Guidelines</h3>
                <div className="text-xs text-slate-600 space-y-2.5 max-h-80 overflow-y-auto pr-2 leading-relaxed">
                  <p><strong>1. Campus Common Areas:</strong> Always meet fellow students in well-lit, public areas such as college libraries, campus cafeterias, or student unions.</p>
                  <p><strong>2. Physical Verification:</strong> Inspect the binding, check for missing chapters or water damage, and test any included CD/online codes before payment.</p>
                  <p><strong>3. Payment Security:</strong> Pay in cash or use standard UPI (Google Pay, PhonePe, Paytm) only after receiving the material in hand. Never pay upfront advance deposits.</p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

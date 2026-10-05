import React, { useState } from 'react';
import { 
  GraduationCap, 
  Building2, 
  Scale, 
  Heart, 
  Users, 
  Calculator, 
  ClipboardCheck, 
  PlusCircle,
  Menu,
  X,
  Compass,
  Home,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TIP_QC_INFO } from '../data/dormsData';

export default function Navbar({
  useTrueCost,
  setUseTrueCost,
  comparisonList,
  onOpenComparison,
  savedFavorites,
  onOpenFavorites,
  onOpenRoommateQuiz,
  onOpenBudgetPlanner,
  onOpenChecklist,
  onOpenAddListing,
  activeView,
  setActiveView
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand: DormMate */}
          <div 
            onClick={() => setActiveView('landing')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-amber-200 shrink-0">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-900">
                  Dorm<span className="text-amber-500">Mate</span>
                </span>
                <span className="px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-black tracking-wide uppercase bg-amber-100 text-amber-900 rounded-full border border-amber-200">
                  TIP - QC
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-500 hidden sm:block">
                Technological Institute of the Philippines • Quezon City
              </p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveView('landing')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'landing' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <button
              onClick={() => setActiveView('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Browse TIP Dorms</span>
            </button>
            <button
              onClick={() => setActiveView('map')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeView === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Campus Gates Map</span>
            </button>
          </nav>

          {/* True Cost / Base Rent Switch */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setUseTrueCost(false)}
              className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                !useTrueCost 
                  ? 'bg-white text-slate-800 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Base Rent
            </button>
            <button
              onClick={() => setUseTrueCost(true)}
              className={`px-2 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold flex items-center gap-1 transition-all ${
                useTrueCost 
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-300' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Includes Meralco, water, fiber internet, laundry and dues in ₱"
            >
              <span>True Cost</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>

          {/* Actions & Utilities (Desktop & Mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Roommate Match */}
            <button
              onClick={onOpenRoommateQuiz}
              className="hidden md:flex items-center gap-1.5 p-2 px-3 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Roommates</span>
            </button>

            {/* Budget Calc */}
            <button
              onClick={onOpenBudgetPlanner}
              className="hidden md:flex items-center gap-1.5 p-2 px-3 text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Budget (₱)</span>
            </button>

            {/* Compare Pinned (Badge count) */}
            <button
              onClick={onOpenComparison}
              disabled={comparisonList.length === 0}
              className={`relative p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                comparisonList.length > 0
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  : 'text-slate-300 bg-slate-50 cursor-not-allowed border border-slate-200'
              }`}
              title="Compare selected dorms side-by-side"
            >
              <Scale className="w-4 h-4 text-amber-600" />
              <span className="hidden sm:inline">Compare</span>
              {comparisonList.length > 0 && (
                <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-600 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center">
                  {comparisonList.length}
                </span>
              )}
            </button>

            {/* Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2 rounded-xl text-slate-700 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Saved Dorms"
            >
              <Heart className={`w-5 h-5 ${savedFavorites.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
              {savedFavorites.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {savedFavorites.length}
                </span>
              )}
            </button>

            {/* List Dorm Button */}
            <button
              onClick={onOpenAddListing}
              className="hidden lg:flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>List a Dorm</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs font-medium text-amber-900 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Dedicated Housing Hub for TIP Quezon City</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setActiveView('landing');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 ${
                activeView === 'landing' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Landing Page</span>
            </button>

            <button
              onClick={() => {
                setActiveView('grid');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 ${
                activeView === 'grid' ? 'bg-indigo-600 text-white font-black' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Browse Dorms</span>
            </button>

            <button
              onClick={() => {
                setActiveView('map');
                setMobileMenuOpen(false);
              }}
              className={`p-3 rounded-xl flex items-center gap-2 ${
                activeView === 'map' ? 'bg-indigo-600 text-white font-black' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Campus Map</span>
            </button>

            <button
              onClick={() => {
                onOpenRoommateQuiz();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-100 text-slate-700 rounded-xl flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>Roommates</span>
            </button>

            <button
              onClick={() => {
                onOpenBudgetPlanner();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-100 text-slate-700 rounded-xl flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Budget (₱)</span>
            </button>

            <button
              onClick={() => {
                onOpenChecklist();
                setMobileMenuOpen(false);
              }}
              className="p-3 bg-slate-100 text-slate-700 rounded-xl flex items-center gap-2"
            >
              <ClipboardCheck className="w-4 h-4 text-teal-600" />
              <span>Checklist</span>
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onOpenAddListing();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-amber-400" />
              <span>List a Dorm / Bedspace</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

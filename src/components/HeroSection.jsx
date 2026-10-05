import React from 'react';
import { 
  Search, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Wifi, 
  Clock, 
  Sparkles, 
  SlidersHorizontal,
  Flame,
  Check
} from 'lucide-react';
import { formatCurrency } from '../utils/costCalculations';

export default function HeroSection({
  searchQuery,
  setSearchQuery,
  maxBudget,
  setMaxBudget,
  useTrueCost,
  selectedTags,
  toggleTag,
  availableTags,
  selectedGate,
  setSelectedGate
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white pt-8 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 rounded-3xl mb-8 shadow-xl border border-indigo-900/40">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 -mt-16 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-10 -mb-20 w-72 sm:w-80 h-72 sm:h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto">
        
        {/* Badge & Headline */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-[11px] sm:text-xs font-bold text-amber-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Technological Institute of the Philippines • Quezon City</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3 sm:mb-4 leading-tight">
            Find your safe haven near TIP-QC with <span className="text-amber-400">Zero Hidden Bills</span>.
          </h1>
          
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-normal">
            Calibrated Meralco submeter rates, verified 200+ Mbps Wi-Fi, thesis lab curfew permissions, and direct walking times to Gates 1, 2, and 3.
          </p>
        </div>

        {/* Central Search Card - Fully Responsive for all phones */}
        <div className="bg-white rounded-2xl p-3 sm:p-5 shadow-2xl text-slate-800 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* TIP Gate Selection */}
            <div className="md:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Target TIP-QC Campus Gate
              </label>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <select
                  value={selectedGate}
                  onChange={(e) => setSelectedGate(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm font-bold text-slate-800 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Any TIP Gate (All nearby)</option>
                  <option value="Gate 1 (Aurora Blvd)">Gate 1 (Aurora Blvd Main Gate)</option>
                  <option value="Gate 2 (Anonas St)">Gate 2 (Anonas St / LRT-2 Gate)</option>
                  <option value="Gate 3 (20th Ave Gate)">Gate 3 (20th Ave / Project 4)</option>
                </select>
              </div>
            </div>

            {/* Keyword / Address search */}
            <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <label className="block text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                Search Name, Street, or Feature
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Hive, Anonas, drafting table, flood-free..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
                />
              </div>
            </div>

            {/* Max Budget Slider in Philippine Peso */}
            <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-xl p-2.5">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Max {useTrueCost ? 'True' : 'Base'} Rent
                </label>
                <span className="text-xs sm:text-sm font-extrabold text-indigo-700">
                  {formatCurrency(maxBudget)}
                </span>
              </div>
              <input
                type="range"
                min="2000"
                max="12000"
                step="500"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>₱2,000</span>
                <span>₱12,000</span>
              </div>
            </div>

          </div>

          {/* Quick Filter Tag Chips (Horizontal scrollable for mobile) */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 text-[10px] sm:text-[11px] font-medium shrink-0 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" /> Must-Haves:
            </span>
            {availableTags.map(tag => {
              const isSelected = selectedTags.includes(tag.id);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  <span>{tag.label}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

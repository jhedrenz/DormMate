import React from 'react';
import { 
  RotateCcw, 
  ArrowUpDown, 
  Footprints, 
  Bed, 
  Users, 
  Moon, 
  Check, 
  MapPin,
  Sparkles
} from 'lucide-react';

export default function FilterBar({
  roomTypeFilter,
  setRoomTypeFilter,
  distanceFilter,
  setDistanceFilter,
  genderFilter,
  setGenderFilter,
  curfewOnlyNoCurfew,
  setCurfewOnlyNoCurfew,
  selectedGate,
  setSelectedGate,
  minSlotsFilter,
  setMinSlotsFilter,
  sortBy,
  setSortBy,
  totalResults,
  resetFilters
}) {
  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        
        {/* Results Counter & Reset */}
        <div className="flex items-center gap-2.5">
          <span className="font-black text-slate-900 text-xs sm:text-sm">
            {totalResults} {totalResults === 1 ? 'Housing Option' : 'Housing Options'} near TIP-QC
          </span>
          <span className="text-slate-300">|</span>
          <button
            onClick={resetFilters}
            className="text-[11px] sm:text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        </div>

        {/* Filter Dropdowns Grid - Highly responsive for all phone screens */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          
          {/* Bedspace Slots Open Filter */}
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-xl px-2.5 py-1.5">
            <Bed className="w-3.5 h-3.5 text-amber-700" />
            <select
              value={minSlotsFilter}
              onChange={(e) => setMinSlotsFilter(e.target.value)}
              className="bg-transparent font-bold text-amber-950 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Any Open Bedspace</option>
              <option value="1">1+ Slot Available</option>
              <option value="2">2+ Slots Open (For Friends)</option>
              <option value="3">3+ Slots Open (Group)</option>
            </select>
          </div>

          {/* TIP Gate Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <select
              value={selectedGate}
              onChange={(e) => setSelectedGate(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All TIP Gates</option>
              <option value="Gate 1 (Aurora Blvd)">Gate 1 (Aurora Blvd)</option>
              <option value="Gate 2 (Anonas St)">Gate 2 (Anonas St)</option>
              <option value="Gate 3 (20th Ave Gate)">Gate 3 (20th Ave)</option>
            </select>
          </div>

          {/* Room Type */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Bed className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={roomTypeFilter}
              onChange={(e) => setRoomTypeFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Room Types</option>
              <option value="Shared 4-Bed Quad">Bedspace (Quad)</option>
              <option value="Shared 2-Bed">Shared 2-Bed Room</option>
              <option value="Solo Studio">Solo Studio / 1BR</option>
            </select>
          </div>

          {/* Distance */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Footprints className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={distanceFilter}
              onChange={(e) => setDistanceFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">Any Walk Time</option>
              <option value="3">&lt; 3 mins walk</option>
              <option value="5">&lt; 5 mins walk</option>
              <option value="8">&lt; 8 mins walk</option>
            </select>
          </div>

          {/* Gender Policy */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="bg-transparent font-medium text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="all">All Genders</option>
              <option value="Co-Ed">Co-Ed</option>
              <option value="Female Only">Female Only</option>
              <option value="Male Only">Male Only</option>
            </select>
          </div>

          {/* Curfew Toggle */}
          <button
            onClick={() => setCurfewOnlyNoCurfew(!curfewOnlyNoCurfew)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
              curfewOnlyNoCurfew
                ? 'bg-amber-400 text-slate-950 shadow-xs'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>24/7 / No Curfew</span>
            {curfewOnlyNoCurfew && <Check className="w-3 h-3 stroke-[3]" />}
          </button>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 sm:ml-auto">
            <ArrowUpDown className="w-3.5 h-3.5 text-indigo-600" />
            <span className="text-slate-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-bold text-slate-800 focus:outline-hidden cursor-pointer"
            >
              <option value="mostSlots">Most Bedspaces Available</option>
              <option value="trueCostAsc">Lowest True Cost (₱)</option>
              <option value="baseRentAsc">Lowest Base Rent (₱)</option>
              <option value="walkingDistance">Closest to TIP Gate</option>
              <option value="wifiSpeed">Fastest Wi-Fi (Mbps)</option>
            </select>
          </div>

        </div>

      </div>
    </div>
  );
}

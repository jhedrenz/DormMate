import React from 'react';
import { 
  Footprints, 
  Wifi, 
  Volume2, 
  ShieldCheck, 
  Heart, 
  Scale, 
  Moon, 
  Check, 
  Zap, 
  UserCheck, 
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Bed,
  Users,
  Flame,
  Building2
} from 'lucide-react';
import { calculateTrueCost, calculateMoveInCash, formatCurrency } from '../utils/costCalculations';

export default function ListingCard({
  dorm,
  useTrueCost,
  isFavorite,
  onToggleFavorite,
  isCompared,
  onToggleCompare,
  onSelectDorm
}) {
  const cost = calculateTrueCost(dorm, 1);
  const moveIn = calculateMoveInCash(dorm, 1);

  const displayPrice = useTrueCost ? cost.totalMonthly : dorm.pricing.baseRent;
  const bedInfo = dorm.bedspaceInfo || { availableSlots: 1, totalSlots: 1, urgency: 'normal' };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Top Graphic Header (No Fake/Stock Images) */}
      <div className="relative h-44 sm:h-48 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col justify-between p-3.5 sm:p-4">
        {/* Subtle decorative grid & glow */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black bg-white/95 text-slate-900 shadow-md backdrop-blur-xs flex items-center gap-1">
              <Footprints className="w-3.5 h-3.5 text-indigo-600" />
              <span>{dorm.distanceCampus.walkingMins}m walk to {dorm.distanceCampus.gate ? dorm.distanceCampus.gate.split('(')[0] : 'TIP'}</span>
            </span>

            {/* Bedspace Availability Pill */}
            <span className={`px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-black shadow-md backdrop-blur-xs flex items-center gap-1 ${
              bedInfo.availableSlots === 1
                ? 'bg-rose-500 text-white animate-pulse'
                : bedInfo.availableSlots === 2
                ? 'bg-amber-400 text-slate-950 font-black'
                : 'bg-emerald-500 text-white'
            }`}>
              <Bed className="w-3.5 h-3.5" />
              <span>
                {bedInfo.availableSlots === 1 
                  ? 'Last 1 Bedspace Left!' 
                  : `${bedInfo.availableSlots} of ${bedInfo.totalSlots} Bedspaces Open`}
              </span>
            </span>
          </div>

          {/* Favorite Quick Icon */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(dorm.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-all ${
                isFavorite 
                  ? 'bg-rose-500 text-white shadow-md' 
                  : 'bg-white/10 hover:bg-white/25 text-white border border-white/15'
              }`}
              title="Save to favorites"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

        {/* Center Graphic: Room Layout Blueprint Icon */}
        <div className="relative z-10 flex items-center justify-center gap-3 my-auto py-1">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-amber-400 shadow-inner">
            {dorm.roomType.includes('Studio') ? (
              <Building2 className="w-6 h-6 text-indigo-300" />
            ) : (
              <Bed className="w-6 h-6 text-amber-400" />
            )}
          </div>
          <div>
            <p className="text-white font-black text-sm tracking-wide flex items-center gap-1.5">
              <span>{dorm.roomType}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30">
                TIP-QC
              </span>
            </p>
            <p className="text-[11px] text-slate-300 font-medium">
              {dorm.bedspaceInfo?.slotType || 'Student Verified Living'}
            </p>
          </div>
        </div>

        {/* Bottom Bar: Room specs & Submeter tag */}
        <div className="relative z-10 flex items-center justify-between text-white text-[11px] sm:text-xs pt-1 border-t border-white/10">
          <span className="font-bold text-slate-300">
            {dorm.genderPolicy} • {dorm.curfewStrict ? 'With Curfew' : 'Thesis Friendly'}
          </span>
          {dorm.verifiedLandlord && (
            <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-md backdrop-blur-md border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Audited Meralco</span>
            </span>
          )}
        </div>

      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Bedspace Availability Alert Banner */}
          <div className="mb-2.5 flex items-center justify-between bg-slate-50 p-2 px-2.5 rounded-xl border border-slate-200 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${
                bedInfo.availableSlots === 1 ? 'bg-rose-500 animate-ping' : 'bg-emerald-500'
              }`}></div>
              <span className="font-bold text-slate-800">
                {bedInfo.slotType || 'Bedspace'}
              </span>
            </div>
            <span className="font-extrabold text-amber-700">
              {bedInfo.availableSlots} {bedInfo.availableSlots === 1 ? 'slot' : 'slots'} available
            </span>
          </div>

          {/* Title & Address */}
          <h3 
            onClick={() => onSelectDorm(dorm)}
            className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
          >
            {dorm.title}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 line-clamp-1">
            {dorm.address}
          </p>

          {/* Pricing Box - Highlighted True Cost in Philippine Peso */}
          <div className="mt-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-xl sm:text-2xl font-black text-slate-900">
                  {formatCurrency(displayPrice)}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium"> / mo per bedspace</span>
              </div>

              {/* Price Type Label */}
              <span className={`text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md ${
                useTrueCost 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-slate-200 text-slate-700'
              }`}>
                {useTrueCost ? 'True Total Cost' : 'Base Rent Only'}
              </span>
            </div>

            {/* Subtitle */}
            <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-600">
              {useTrueCost ? (
                <span>Meralco, water, fiber & dues included</span>
              ) : (
                <span className="text-amber-700 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-500" />
                  +₱{cost.hiddenCostDifference}/mo est. utilities
                </span>
              )}
              <span className="text-slate-400">
                Deposit: {dorm.pricing.depositMonths} mo
              </span>
            </div>
          </div>

          {/* Student Reality Scorecard (Wi-Fi, Noise, Move-in Cash) */}
          <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2 text-center text-xs">
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="flex items-center justify-center gap-1 text-indigo-600 font-bold text-[11px] sm:text-xs">
                <Wifi className="w-3.5 h-3.5" />
                <span>{dorm.studentReality.wifiSpeedMbps}M</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 font-medium">Fiber Speed</p>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="flex items-center justify-center gap-1 text-emerald-600 font-bold text-[11px] sm:text-xs">
                <Volume2 className="w-3.5 h-3.5" />
                <span>{dorm.studentReality.noiseScore}/10</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 font-medium">Study Quiet</p>
            </div>

            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <div className="flex items-center justify-center gap-1 text-slate-800 font-black text-[11px] sm:text-xs">
                <span>{formatCurrency(moveIn.totalCashNeeded)}</span>
              </div>
              <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 font-medium">Move-in Cash</p>
            </div>
          </div>

          {/* Roommate opening callout if available */}
          {dorm.roommateOpenings.length > 0 && (
            <div className="mt-2.5 bg-violet-50 border border-violet-200/80 rounded-xl p-2 sm:p-2.5 flex items-center justify-between text-xs text-violet-900">
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span className="font-bold text-[11px] sm:text-xs line-clamp-1">
                  {dorm.roommateOpenings[0].name.split(' ')[0]} ({dorm.roommateOpenings[0].major.split(' ')[1] || 'TIP'})
                </span>
              </div>
              <span className="text-[10px] font-black text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full shrink-0">
                Split Rent
              </span>
            </div>
          )}

        </div>

        {/* Bottom Actions */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Compare toggle button */}
          <button
            onClick={() => onToggleCompare(dorm.id)}
            className={`px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
              isCompared
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden xs:inline">{isCompared ? 'Compared' : 'Compare'}</span>
            {isCompared && <Check className="w-3 h-3 stroke-[3]" />}
          </button>

          {/* View Details Modal Button */}
          <button
            onClick={() => onSelectDorm(dorm)}
            className="flex-1 px-3 sm:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-extrabold transition-all shadow-xs shadow-indigo-200 flex items-center justify-center gap-1.5"
          >
            <span>Inspect Slots ({bedInfo.availableSlots} Open)</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

        </div>

      </div>

    </div>
  );
}

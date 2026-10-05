import React, { useState } from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Footprints, 
  Wifi, 
  Volume2, 
  ArrowRight,
  Info,
  DollarSign,
  Bed,
  Building2
} from 'lucide-react';
import { formatCurrency, calculateTrueCost } from '../utils/costCalculations';
import { TIP_QC_INFO } from '../data/dormsData';

export default function CampusMapView({
  dorms,
  useTrueCost,
  onSelectDorm
}) {
  const [selectedPin, setSelectedPin] = useState(null);

  // Campus coordinates (center is 50%, 48%)
  const campusCoords = TIP_QC_INFO.coords || { x: 50, y: 48 };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden mb-8">
      
      {/* Map Header & Legend */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
            <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
              TIP Quezon City Walking Radius Map
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Aurora Blvd, Anonas St, & 20th Ave Gate Proximity
          </p>
        </div>

        {/* Radius Legend */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500"></span>
            <span>&lt; 4 min (Zero Fare)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-indigo-500/20 border border-indigo-500"></span>
            <span>4 - 7 min Walk</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-violet-500/20 border border-violet-500"></span>
            <span>7 - 10 min Walk</span>
          </div>
        </div>
      </div>

      {/* Map Interactive Canvas */}
      <div className="relative w-full h-[420px] sm:h-[500px] bg-slate-100 overflow-hidden select-none border-b border-slate-200">
        
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#94a3b8 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        ></div>

        {/* Concentric Walking Radius Rings centered on TIP QC */}
        {/* 10 min ring */}
        <div 
          className="absolute rounded-full border-2 border-dashed border-violet-300 bg-violet-50/25 pointer-events-none transition-all transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${campusCoords.x}%`,
            top: `${campusCoords.y}%`,
            width: '360px',
            height: '360px'
          }}
        >
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-bold text-violet-600 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-full shadow-2xs">
            10 Min Radius
          </span>
        </div>

        {/* 6 min ring */}
        <div 
          className="absolute rounded-full border-2 border-dashed border-indigo-300 bg-indigo-50/35 pointer-events-none transition-all transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${campusCoords.x}%`,
            top: `${campusCoords.y}%`,
            width: '240px',
            height: '240px'
          }}
        >
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-bold text-indigo-600 uppercase tracking-wider bg-white/90 px-2 py-0.5 rounded-full shadow-2xs">
            6 Min Radius
          </span>
        </div>

        {/* 3 min ring */}
        <div 
          className="absolute rounded-full border-2 border-emerald-400 bg-emerald-100/40 pointer-events-none transition-all transform -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${campusCoords.x}%`,
            top: `${campusCoords.y}%`,
            width: '130px',
            height: '130px'
          }}
        >
          <span className="absolute top-1.5 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-wider bg-white/95 px-2 py-0.5 rounded-full shadow-2xs">
            3 Min Zone (Zero Fare)
          </span>
        </div>

        {/* Central TIP QC Campus Anchor */}
        <div 
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
          style={{ left: `${campusCoords.x}%`, top: `${campusCoords.y}%` }}
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-700 text-white shadow-xl flex items-center justify-center border-2 border-white ring-4 ring-amber-300/60">
            <GraduationCap className="w-6 h-6 animate-bounce" />
          </div>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] sm:text-[11px] font-black shadow-md whitespace-nowrap border border-amber-400/40">
            TIP - Quezon City
          </span>
        </div>

        {/* Dorm Pins */}
        {dorms.map(dorm => {
          const cost = calculateTrueCost(dorm, 1);
          const price = useTrueCost ? cost.totalMonthly : dorm.pricing.baseRent;
          const isSelected = selectedPin?.id === dorm.id;
          const coords = dorm.coords || { x: 50, y: 50 };

          return (
            <div
              key={dorm.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 transition-transform duration-200"
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`
              }}
            >
              <button
                onClick={() => setSelectedPin(dorm)}
                className={`group flex items-center gap-1 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl shadow-lg border-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-amber-400 text-slate-950 border-white scale-110 ring-4 ring-amber-300' 
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200 hover:scale-105'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  dorm.distanceCampus.walkingMins <= 4 
                    ? 'bg-emerald-500' 
                    : dorm.distanceCampus.walkingMins <= 7 
                    ? 'bg-indigo-500' 
                    : 'bg-violet-500'
                }`}></div>
                <span className="text-[11px] sm:text-xs font-black">
                  {formatCurrency(price)}
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold opacity-75">
                  ({dorm.distanceCampus.walkingMins}m)
                </span>
              </button>
            </div>
          );
        })}

        {/* Selected Pin Floating Card */}
        {selectedPin && (
          <div className="absolute bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-slate-200 z-30 animate-in slide-in-from-bottom duration-200">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-amber-400 shrink-0 border border-slate-700 shadow-inner">
                  {selectedPin.roomType.includes('Studio') ? (
                    <Building2 className="w-5 h-5 text-indigo-300" />
                  ) : (
                    <Bed className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                    {selectedPin.title}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {selectedPin.roomType} • {selectedPin.distanceCampus.walkingMins}m to {selectedPin.distanceCampus.gate ? selectedPin.distanceCampus.gate.split('(')[0] : 'TIP'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPin(null)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-sm font-black text-slate-900">
                  {formatCurrency(useTrueCost ? calculateTrueCost(selectedPin, 1).totalMonthly : selectedPin.pricing.baseRent)}
                </span>
                <span className="text-[9px] text-slate-400 block">{useTrueCost ? 'True monthly' : 'Base rent'}</span>
              </div>
              
              <button
                onClick={() => onSelectDorm(selectedPin)}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
              >
                <span>Inspect</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

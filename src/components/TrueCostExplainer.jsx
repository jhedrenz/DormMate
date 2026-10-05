import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Zap, Droplets, Wifi, Bus, Sparkles } from 'lucide-react';
import { formatCurrency } from '../utils/costCalculations';

export default function TrueCostExplainer({ useTrueCost, setUseTrueCost }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-indigo-50 border border-amber-200/80 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-300 flex items-center justify-center shrink-0 text-amber-700">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                The TIPian "Sticker Price" Trap: Base Rent vs True Monthly Living Cost
              </h3>
              <span className="px-2 py-0.5 text-[10px] sm:text-[11px] font-bold bg-amber-200 text-amber-900 rounded-md">
                TIP-QC Tenant Shield
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Standard ads in Cubao & Anonas only show base rent. TIP students regularly pay an extra <strong>₱1,200 - ₱2,200/month</strong> in marked-up Meralco submeters, drinking water, Converge Wi-Fi shares, and jeepney fares!
            </p>
          </div>
        </div>

        {/* Action Toggle or Expand */}
        <div className="flex items-center gap-2 self-start md:self-center shrink-0 w-full sm:w-auto">
          <button
            onClick={() => setUseTrueCost(!useTrueCost)}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-xs ${
              useTrueCost 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200'
            }`}
          >
            {useTrueCost ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>True Cost (Safe Mode)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Switch to True Cost View</span>
              </>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-3 py-2 bg-white/80 hover:bg-white text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold transition-colors"
          >
            {isOpen ? 'Hide' : 'See Example'}
          </button>
        </div>

      </div>

      {/* Expandable Breakdown Example */}
      {isOpen && (
        <div className="mt-4 pt-4 border-t border-amber-200/60 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
          
          <div className="bg-white/90 rounded-2xl p-4 border border-rose-200 text-xs">
            <div className="flex items-center justify-between font-bold text-rose-800 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                What Facebook Ads Show You:
              </span>
              <span className="text-base text-slate-900 font-black">₱2,800 / month</span>
            </div>
            <p className="text-slate-500 mb-2">Advertised "cheap" bedspace in Project 4 that looks like a great deal.</p>
            <div className="text-[11px] text-rose-800 bg-rose-50 rounded-xl p-2.5 font-medium leading-relaxed">
              ⚠️ <strong>Hidden Gotchas:</strong> Landlord charges an illegal ₱24/kWh submeter (₱850 for fan & laptop), ₱200 Wi-Fi fee, ₱250 water bill, and ₱600/month jeepney fares from Aurora Blvd traffic.
            </div>
          </div>

          <div className="bg-white/90 rounded-2xl p-4 border border-emerald-200 text-xs">
            <div className="flex items-center justify-between font-bold text-emerald-800 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                The Real Total You Actually Pay:
              </span>
              <span className="text-base font-black text-emerald-700">₱4,700 / month</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-600 text-[11px] mb-2 font-medium">
              <div className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-500" /> Meralco: +₱750</div>
              <div className="flex items-center gap-1"><Droplets className="w-3.5 h-3.5 text-blue-500" /> Manila Water: +₱200</div>
              <div className="flex items-center gap-1"><Wifi className="w-3.5 h-3.5 text-indigo-500" /> Fiber Net: +₱150</div>
              <div className="flex items-center gap-1"><Bus className="w-3.5 h-3.5 text-emerald-500" /> Jeep/Trike: +₱600</div>
            </div>
            <div className="text-[11px] text-emerald-800 bg-emerald-50 rounded-xl p-2.5 font-medium leading-relaxed">
              ✨ <strong>DormMate Solution:</strong> We audit the submeter rates and show true monthly cost so TIPians never run out of allowance mid-finals.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

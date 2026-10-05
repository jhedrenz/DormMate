import React, { useState } from 'react';
import { 
  X, 
  Calculator, 
  DollarSign, 
  PieChart, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  AlertCircle,
  Bed,
  Building2
} from 'lucide-react';
import { formatCurrency, calculateTrueCost } from '../utils/costCalculations';

export default function BudgetOptimizerModal({
  dorms,
  onClose,
  onSelectDorm
}) {
  const [allowance, setAllowance] = useState(8000); // ₱8,000 PHP allowance default

  // 45% rule for safe student housing budget in QC
  const safeHousingBudget = Math.round(allowance * 0.45);
  const groceriesBudget = Math.round(allowance * 0.30);
  const schoolSuppliesAndLeisure = Math.round(allowance * 0.15);
  const emergencySavings = allowance - (safeHousingBudget + groceriesBudget + schoolSuppliesAndLeisure);

  // Filter dorms that fit safely under True Monthly Cost
  const affordableDorms = dorms.filter(d => {
    const cost = calculateTrueCost(d, 1);
    return cost.totalMonthly <= safeHousingBudget;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                TIPian Budget Safety Planner (₱)
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Keep total living costs under 45% of allowance to avoid mid-semester debt
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5">
          
          {/* Allowance Slider */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-[11px] sm:text-xs font-bold text-slate-600 uppercase tracking-wider">
                Monthly Allowance / Income
              </label>
              <span className="text-xl sm:text-2xl font-black text-indigo-700">
                {formatCurrency(allowance)}
                <span className="text-xs font-normal text-slate-500"> / mo</span>
              </span>
            </div>
            <input
              type="range"
              min="3000"
              max="25000"
              step="500"
              value={allowance}
              onChange={(e) => setAllowance(Number(e.target.value))}
              className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₱3,000 (Tight budget)</span>
              <span>₱8,000 (Standard)</span>
              <span>₱25,000 (Stipend / Working student)</span>
            </div>
          </div>

          {/* Allocation Breakdown Cards */}
          <div>
            <h4 className="text-[11px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Recommended Student Financial Split
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              
              <div className="p-2.5 sm:p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                  Housing & Bills (45%)
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-700 mt-0.5 block">
                  {formatCurrency(safeHousingBudget)}
                </span>
                <span className="text-[10px] text-emerald-600">Safe Max Rent</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-amber-50 border border-amber-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                  Meals & Karinderya (30%)
                </span>
                <span className="text-base sm:text-lg font-black text-amber-700 mt-0.5 block">
                  {formatCurrency(groceriesBudget)}
                </span>
                <span className="text-[10px] text-amber-600">~₱80/meal</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-blue-50 border border-blue-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-blue-800 uppercase tracking-wider block">
                  School & Thesis (15%)
                </span>
                <span className="text-base sm:text-lg font-black text-blue-700 mt-0.5 block">
                  {formatCurrency(schoolSuppliesAndLeisure)}
                </span>
                <span className="text-[10px] text-blue-600">Prints, materials</span>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-purple-50 border border-purple-200">
                <span className="text-[9px] sm:text-[10px] font-bold text-purple-800 uppercase tracking-wider block">
                  Emergency Buffer (10%)
                </span>
                <span className="text-base sm:text-lg font-black text-purple-700 mt-0.5 block">
                  {formatCurrency(emergencySavings)}
                </span>
                <span className="text-[10px] text-purple-600">Savings reserve</span>
              </div>

            </div>
          </div>

          {/* Safe Housing Recommendations */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm">
                Options Within Safe Budget ({affordableDorms.length})
              </h4>
              <span className="text-[11px] text-slate-500">
                Under {formatCurrency(safeHousingBudget)}/mo True Cost
              </span>
            </div>

            {affordableDorms.length === 0 ? (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
                <AlertCircle className="w-5 h-5 text-amber-600 mx-auto mb-1.5" />
                <p className="font-bold text-amber-900 text-xs sm:text-sm">No solo units under this budget</p>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Try finding a TIP roommate to split a 2-bed suite down to ₱2,400/month!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {affordableDorms.map(dorm => {
                  const cost = calculateTrueCost(dorm, 1);
                  return (
                    <div 
                      key={dorm.id}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 hover:border-emerald-400 transition-all flex items-center justify-between gap-2.5"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-amber-400 shrink-0 border border-slate-700 shadow-inner">
                          {dorm.roomType.includes('Studio') ? (
                            <Building2 className="w-4 h-4 text-indigo-300" />
                          ) : (
                            <Bed className="w-4 h-4 text-amber-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">{dorm.title}</p>
                          <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                            {dorm.roomType} • {dorm.distanceCampus.walkingMins}m walk to {dorm.distanceCampus.gate ? dorm.distanceCampus.gate.split('(')[0] : 'TIP'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="text-right">
                          <span className="text-xs sm:text-sm font-black text-emerald-700">{formatCurrency(cost.totalMonthly)}</span>
                          <span className="text-[9px] text-slate-400 block">true cost</span>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectDorm(dorm);
                          }}
                          className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs transition-colors"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

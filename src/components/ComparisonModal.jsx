import React from 'react';
import { 
  X, 
  Scale, 
  Check, 
  Footprints, 
  Wifi, 
  Volume2, 
  Moon, 
  DollarSign, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Trophy,
  Bed,
  Building2
} from 'lucide-react';
import { calculateTrueCost, calculateMoveInCash, formatCurrency } from '../utils/costCalculations';

export default function ComparisonModal({
  comparisonDorms,
  onClose,
  onRemoveFromCompare,
  onSelectDorm
}) {
  if (!comparisonDorms || comparisonDorms.length === 0) return null;

  // Calculate costs in Philippine Peso
  const calculatedDorms = comparisonDorms.map(d => ({
    ...d,
    cost: calculateTrueCost(d, 1),
    moveIn: calculateMoveInCash(d, 1)
  }));

  const lowestTrueCost = Math.min(...calculatedDorms.map(d => d.cost.totalMonthly));
  const lowestMoveIn = Math.min(...calculatedDorms.map(d => d.moveIn.totalCashNeeded));
  const shortestWalk = Math.min(...calculatedDorms.map(d => d.distanceCampus.walkingMins));
  const fastestWifi = Math.max(...calculatedDorms.map(d => d.studentReality.wifiSpeedMbps));
  const highestQuietScore = Math.max(...calculatedDorms.map(d => d.studentReality.noiseScore));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-5xl w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                TIPian Side-by-Side Comparison
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Comparing {comparisonDorms.length} options to find the genuine best value in QC
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

        {/* Comparison Table */}
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[550px]">
            <thead>
              <tr>
                <th className="p-2.5 sm:p-3 w-1/4 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 rounded-tl-xl">
                  Housing Criteria
                </th>
                {calculatedDorms.map(dorm => (
                  <th key={dorm.id} className="p-2.5 sm:p-3 w-1/3 align-top bg-slate-50 border-l border-slate-200">
                    <div className="relative">
                      <button
                        onClick={() => onRemoveFromCompare(dorm.id)}
                        className="absolute -top-1 -right-1 text-slate-400 hover:text-rose-600 p-1"
                        title="Remove from comparison"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="w-full h-18 sm:h-20 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-amber-400 mb-2 border border-slate-700 shadow-inner">
                        {dorm.roomType.includes('Studio') ? (
                          <Building2 className="w-5 h-5 text-indigo-300" />
                        ) : (
                          <Bed className="w-5 h-5 text-amber-400" />
                        )}
                        <span className="text-[9px] font-black text-slate-300 tracking-wider mt-1 uppercase">
                          {dorm.roomType}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                        {dorm.title}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 line-clamp-1">{dorm.roomType} • {dorm.genderPolicy}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="text-xs divide-y divide-slate-100 font-medium">
              
              {/* Bedspace Availability Row */}
              <tr className="bg-amber-50/60">
                <td className="p-2.5 sm:p-3 font-bold text-amber-950">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-amber-700" />
                    <span>Available Bedspaces</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">Real-time vacancy</span>
                </td>
                {calculatedDorms.map(dorm => {
                  const info = dorm.bedspaceInfo || { availableSlots: 1, totalSlots: 1 };
                  return (
                    <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200">
                      <span className={`inline-block px-2 py-0.5 rounded-md font-black text-[11px] ${
                        info.availableSlots === 1 
                          ? 'bg-rose-100 text-rose-800' 
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {info.availableSlots} of {info.totalSlots} Slots Open
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* True Monthly Cost Row */}
              <tr className="bg-emerald-50/50">
                <td className="p-2.5 sm:p-3 font-bold text-emerald-950">
                  <div className="flex items-center gap-1.5">
                    <Trophy className="w-4 h-4 text-emerald-600" />
                    <span>True Monthly Cost</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-normal">All bills included</span>
                </td>
                {calculatedDorms.map(dorm => {
                  const isWinner = dorm.cost.totalMonthly === lowestTrueCost;
                  return (
                    <td key={dorm.id} className={`p-2.5 sm:p-3 border-l border-slate-200 ${isWinner ? 'bg-emerald-100/70 font-bold' : ''}`}>
                      <span className={`text-sm sm:text-base font-black ${isWinner ? 'text-emerald-800' : 'text-slate-900'}`}>
                        {formatCurrency(dorm.cost.totalMonthly)}/mo
                      </span>
                      {isWinner && (
                        <span className="ml-1.5 inline-block px-1.5 py-0.5 rounded-sm bg-emerald-700 text-white text-[9px] font-bold">
                          Best Value
                        </span>
                      )}
                    </td>
                  );
                })}
              </tr>

              {/* Advertised Base Rent */}
              <tr>
                <td className="p-2.5 sm:p-3 text-slate-500">Advertised Base Rent</td>
                {calculatedDorms.map(dorm => (
                  <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200 text-slate-700">
                    {formatCurrency(dorm.pricing.baseRent)}/mo
                  </td>
                ))}
              </tr>

              {/* Hidden Fees Estimate */}
              <tr>
                <td className="p-2.5 sm:p-3 text-slate-500">
                  <span>Est. Utilities & Commute</span>
                  <span className="block text-[10px] text-slate-400">Meralco + Water + Net</span>
                </td>
                {calculatedDorms.map(dorm => (
                  <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200 text-amber-800 font-semibold">
                    +₱{dorm.cost.hiddenCostDifference}/month
                  </td>
                ))}
              </tr>

              {/* Day 1 Move-in Cash */}
              <tr>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-700">
                  Day 1 Cash Required
                  <span className="block text-[10px] text-slate-400 font-normal">Deposit + Advance + Bond</span>
                </td>
                {calculatedDorms.map(dorm => {
                  const isWinner = dorm.moveIn.totalCashNeeded === lowestMoveIn;
                  return (
                    <td key={dorm.id} className={`p-2.5 sm:p-3 border-l border-slate-200 ${isWinner ? 'text-emerald-700 font-bold' : 'text-slate-800'}`}>
                      {formatCurrency(dorm.moveIn.totalCashNeeded)}
                      {isWinner && <span className="ml-1 text-[10px] text-emerald-600 font-semibold">(Lowest)</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Distance to TIP QC Gate */}
              <tr>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Footprints className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Walk to TIP Gate</span>
                  </div>
                </td>
                {calculatedDorms.map(dorm => {
                  const isWinner = dorm.distanceCampus.walkingMins === shortestWalk;
                  return (
                    <td key={dorm.id} className={`p-2.5 sm:p-3 border-l border-slate-200 ${isWinner ? 'text-indigo-700 font-bold' : 'text-slate-800'}`}>
                      {dorm.distanceCampus.walkingMins} mins to {dorm.distanceCampus.gate ? dorm.distanceCampus.gate.split('(')[0] : 'TIP'}
                      {isWinner && <span className="ml-1 text-[10px] text-indigo-600 font-semibold">(Closest)</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Wi-Fi Speed Tested */}
              <tr>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Tested Peak Wi-Fi</span>
                  </div>
                </td>
                {calculatedDorms.map(dorm => {
                  const isWinner = dorm.studentReality.wifiSpeedMbps === fastestWifi;
                  return (
                    <td key={dorm.id} className={`p-2.5 sm:p-3 border-l border-slate-200 ${isWinner ? 'text-indigo-700 font-bold' : 'text-slate-800'}`}>
                      {dorm.studentReality.wifiSpeedMbps} Mbps
                      {isWinner && <span className="ml-1 text-[10px] text-indigo-600 font-semibold">(Blazing)</span>}
                    </td>
                  );
                })}
              </tr>

              {/* Study Quiet Score */}
              <tr>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-700">
                  <div className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Study Quiet Score</span>
                  </div>
                </td>
                {calculatedDorms.map(dorm => (
                  <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200 text-slate-800">
                    {dorm.studentReality.noiseScore} / 10
                  </td>
                ))}
              </tr>

              {/* Curfew Policy */}
              <tr>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-700">Curfew Policy</td>
                {calculatedDorms.map(dorm => (
                  <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200">
                    <span className={`inline-block px-2 py-0.5 rounded-md font-semibold text-[10px] sm:text-[11px] ${
                      dorm.curfewStrict ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {dorm.curfew}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Meralco Submeter Rate */}
              <tr>
                <td className="p-2.5 sm:p-3 font-semibold text-slate-700">Meralco Submeter</td>
                {calculatedDorms.map(dorm => (
                  <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200 text-emerald-700 font-medium">
                    {dorm.pricing.submeterMarkup}
                  </td>
                ))}
              </tr>

              {/* Action Button Row */}
              <tr>
                <td className="p-2.5 sm:p-3 bg-slate-50 rounded-bl-xl"></td>
                {calculatedDorms.map(dorm => (
                  <td key={dorm.id} className="p-2.5 sm:p-3 border-l border-slate-200 bg-slate-50">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectDorm(dorm);
                      }}
                      className="w-full py-2 px-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

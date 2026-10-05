import React from 'react';
import { 
  X, 
  Heart, 
  Trash2, 
  ArrowRight, 
  Printer, 
  Footprints, 
  Scale,
  Bed,
  Building2
} from 'lucide-react';
import { calculateTrueCost, formatCurrency } from '../utils/costCalculations';

export default function FavoritesModal({
  favorites,
  onClose,
  onRemoveFavorite,
  onSelectDorm,
  useTrueCost,
  onOpenComparison
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-rose-600" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Saved TIP-QC Shortlist ({favorites.length})
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500">
                Bookmark and review candidate rooms with your parents
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Print Shortlist"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {favorites.length === 0 ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-800 text-base">No saved dorms yet</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Tap the heart on any dorm card to save it to your shortlist for easy review.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2.5">
                {favorites.map(dorm => {
                  const cost = calculateTrueCost(dorm, 1);
                  const price = useTrueCost ? cost.totalMonthly : dorm.pricing.baseRent;

                  return (
                    <div
                      key={dorm.id}
                      className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-xl bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-amber-400 shrink-0 border border-slate-700 shadow-inner">
                          {dorm.roomType.includes('Studio') ? (
                            <Building2 className="w-5 h-5 text-indigo-300" />
                          ) : (
                            <Bed className="w-5 h-5 text-amber-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 
                            onClick={() => {
                              onClose();
                              onSelectDorm(dorm);
                            }}
                            className="font-bold text-slate-900 text-xs sm:text-sm hover:text-indigo-600 cursor-pointer truncate"
                          >
                            {dorm.title}
                          </h4>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5 truncate">
                            <span>{dorm.roomType}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                              <Footprints className="w-3 h-3" />
                              {dorm.distanceCampus.walkingMins}m walk to {dorm.distanceCampus.gate ? dorm.distanceCampus.gate.split('(')[0] : 'TIP'}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-slate-200">
                        <div className="text-left sm:text-right">
                          <span className="text-sm sm:text-base font-black text-slate-900">
                            {formatCurrency(price)}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-slate-400 block">
                            {useTrueCost ? 'True monthly' : 'Base rent'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              onClose();
                              onSelectDorm(dorm);
                            }}
                            className="p-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold"
                            title="Inspect details"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveFavorite(dorm.id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl text-xs"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {favorites.length >= 2 && (
                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenComparison();
                    }}
                    className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl transition-colors flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Scale className="w-4 h-4" />
                    <span>Compare Saved Options Side-by-Side</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

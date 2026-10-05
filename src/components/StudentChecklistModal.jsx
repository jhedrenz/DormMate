import React, { useState } from 'react';
import { 
  X, 
  ClipboardCheck, 
  CheckSquare, 
  Square, 
  Printer, 
  AlertTriangle
} from 'lucide-react';
import { STUDENT_CHECKLIST_ITEMS } from '../data/dormsData';

export default function StudentChecklistModal({ onClose }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (categoryIdx, itemIdx) => {
    const key = `${categoryIdx}-${itemIdx}`;
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const totalItems = STUDENT_CHECKLIST_ITEMS.reduce((sum, cat) => sum + cat.items.length, 0);
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  const handlePrint = () => {
    window.print();
  };

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
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                TIP-QC Student Room Viewing Checklist
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500">
                Essential physical checks before handing over your security deposit
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors"
              title="Print checklist"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5">
          
          {/* Progress Bar */}
          <div className="bg-slate-50 p-3.5 sm:p-4 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-2">
              <span>Inspection Progress: {completedCount} of {totalItems} verified</span>
              <span className="text-emerald-600 font-extrabold">{progressPercent}% Ready</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* Checklist Categories */}
          <div className="space-y-5">
            {STUDENT_CHECKLIST_ITEMS.map((cat, catIdx) => (
              <div key={catIdx} className="space-y-2.5">
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>{cat.category}</span>
                </h4>

                <div className="space-y-2">
                  {cat.items.map((item, itemIdx) => {
                    const isChecked = !!checkedItems[`${catIdx}-${itemIdx}`];
                    return (
                      <div
                        key={itemIdx}
                        onClick={() => toggleCheck(catIdx, itemIdx)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-2.5 ${
                          isChecked 
                            ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium' 
                            : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300'
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Golden Rule Tip */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Golden Rule for TIPians in Quezon City:</p>
              <p className="mt-0.5 text-amber-800 leading-relaxed">
                Take high-resolution video of the Meralco submeter numbers and all four walls on the day you move in. Send a copy to the landlord via Messenger or Email so you have timestamped proof when claiming back your deposit at the end of the school year.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  X, 
  Users, 
  Sparkles, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Sparkle, 
  Coffee, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  Building
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatCurrency } from '../utils/costCalculations';

export default function RoommateMatcherModal({
  dorms,
  onClose,
  onSelectDorm
}) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    sleep: '',
    study: '',
    cleanliness: '',
    visitors: ''
  });

  const handleSelectOption = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    if (step < 4) {
      setStep(step + 1);
    } else {
      setStep(5);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ sleep: '', study: '', cleanliness: '', visitors: '' });
  };

  const dormsWithRoommates = dorms.filter(d => d.roommateOpenings && d.roommateOpenings.length > 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                TIPian Roommate Compatibility Matcher
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500">
                Split rent safely with fellow TIP students
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

        {/* Quiz Body */}
        <div className="p-4 sm:p-6">
          
          {step <= 4 && (
            <div>
              {/* Progress Bar */}
              <div className="mb-5 sm:mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                  <span>Question {step} of 4</span>
                  <span>{step * 25}% Complete</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-amber-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${step * 25}%` }}
                  ></div>
                </div>
              </div>

              {/* Question 1: Sleep Schedule */}
              {step === 1 && (
                <div className="space-y-3.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    What is your daily sleep & study schedule in TIP?
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSelectOption('sleep', 'Night Owl')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <Moon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Night Owl (Thesis / Coding until 1:30 AM)</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">I study best late at night; keep room dark in early morning.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectOption('sleep', 'Early Bird')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Sun className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Early Riser (7:30 AM Class Morning Person)</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Asleep before 10:30 PM, up early for morning lectures.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectOption('sleep', 'Flexible')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Flexible / Easy Sleeper</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Can sleep easily with earplugs or fan noise.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Question 2: Study Environment */}
              {step === 2 && (
                <div className="space-y-3.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    What does your ideal study environment look like?
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSelectOption('study', 'Library Silence')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <VolumeX className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Pin-Drop Silence (Board Exam / Midterm Prep)</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Need quiet focus for problem sets, formulas & memorization.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectOption('study', 'Collaborative')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                        <Volume2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Collaborative / Background Lo-Fi Music</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Like bouncing code ideas or architecture plate critiques.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Question 3: Cleanliness Routine */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    How do you manage room cleanliness & chores?
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSelectOption('cleanliness', 'Clean As You Go')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-100 text-cyan-700 flex items-center justify-center shrink-0">
                        <Sparkle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Clean-As-You-Go (Spotless)</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Wash plates immediately, desk always clear of food wrappers.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectOption('cleanliness', 'Casual Weekend')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Coffee className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Weekend General Cleaning</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Busy on weekdays, deep clean on Saturday or Sunday.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Question 4: Visitor Policy */}
              {step === 4 && (
                <div className="space-y-3.5">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">
                    What is your preference on visitors & group study?
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleSelectOption('visitors', 'Strict Quiet')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">Rest Sanctuary (Minimal to No Guests)</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Prefer studying outside in TIP library or coffee shops.</p>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectOption('visitors', 'Group Study OK')}
                      className="w-full p-3.5 sm:p-4 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/40 text-left transition-all flex items-center gap-3"
                    >
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs sm:text-sm">TIP Group Study Partners Welcome</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Happy to host fellow classmates for capstone projects.</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Results Step */}
          {step === 5 && (
            <div className="space-y-5 text-center">
              <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-md">
                <Sparkles className="w-7 sm:w-8 h-7 sm:h-8" />
              </div>

              <div>
                <h4 className="text-xl sm:text-2xl font-black text-slate-900">
                  Matched with TIPian Students!
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Based on your habits ({answers.sleep}, {answers.study}), here are students looking for a co-tenant to split rent near TIP-QC:
                </p>
              </div>

              {/* Matched Student Cards */}
              <div className="space-y-3 text-left">
                {dormsWithRoommates.map(dorm => {
                  const roomie = dorm.roommateOpenings[0];
                  return (
                    <div 
                      key={dorm.id} 
                      className="bg-slate-50 rounded-2xl p-3.5 sm:p-4 border border-slate-200 hover:border-amber-400 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-xs sm:text-sm">{roomie.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            95% Match
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-semibold mt-0.5">{roomie.major}</p>
                        <p className="text-xs text-slate-600 mt-1 italic">"{roomie.bio}"</p>
                        <p className="text-xs font-bold text-indigo-700 mt-1 flex items-center gap-1">
                          <Building className="w-3.5 h-3.5" />
                          <span>{dorm.title} (~{formatCurrency(dorm.pricing.baseRent / 2)}/mo each)</span>
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectDorm(dorm);
                        }}
                        className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1.5 shrink-0 self-start sm:self-center"
                      >
                        <span>View Room</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-center gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Compatibility Quiz</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

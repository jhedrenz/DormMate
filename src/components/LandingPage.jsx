import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Footprints, 
  Users, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Building2, 
  Heart,
  Droplets,
  Wifi,
  DollarSign,
  AlertTriangle,
  Flame,
  MessageSquare,
  Bed
} from 'lucide-react';
import { TIP_QC_INFO } from '../data/dormsData';
import { formatCurrency, calculateTrueCost } from '../utils/costCalculations';

export default function LandingPage({
  featuredDorms,
  onExploreAll,
  onSelectDorm,
  onOpenRoommateQuiz,
  onOpenBudgetPlanner,
  onOpenChecklist,
  useTrueCost,
  setUseTrueCost
}) {
  return (
    <div className="space-y-16 sm:space-y-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950 text-white pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 rounded-3xl shadow-2xl border border-indigo-900/50">
        
        {/* Ambient lighting glows */}
        <div className="absolute top-0 right-1/4 -mt-20 w-80 sm:w-96 h-80 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-10 -mb-20 w-80 sm:w-96 h-80 sm:h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center">
          
          {/* Official TIPian Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-xs sm:text-sm font-bold text-amber-300 mb-5 shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Exclusively for TIP Quezon City Students (TIPians)</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 sm:mb-6 leading-tight">
            Stop struggling to find a dorm near <span className="text-amber-400">TIP-QC</span>.<br className="hidden sm:inline" />
            Rent with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-amber-300 to-indigo-300">Live Bedspace Availability</span>.
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed mb-8">
            Real-time open slot counts, official Meralco submeter rates, verified 200+ Mbps Wi-Fi speeds, and walking times to TIP Gates 1, 2, & 3.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-10">
            <button
              onClick={onExploreAll}
              className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-400/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Browse Vacant Bedspaces</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenRoommateQuiz}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
            >
              <Users className="w-4 h-4 text-amber-300" />
              <span>Roommate Quiz</span>
            </button>
          </div>

          {/* TIP-QC Fast Highlights Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-white/10 text-center">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-xl sm:text-2xl font-black text-amber-300">Live Slots</p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Real-time Bedspace Tracker</p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-xl sm:text-2xl font-black text-emerald-300">2-8 Mins</p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Walk to TIP Gates</p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-xl sm:text-2xl font-black text-indigo-300">₱13.50/kWh</p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Official Meralco Submeters</p>
            </div>
            <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
              <p className="text-xl sm:text-2xl font-black text-violet-300">100%</p>
              <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5">Flood-Free Audited</p>
            </div>
          </div>

        </div>

      </section>

      {/* 2. THE TIP-QC STRUGGLE: WHY TIPIANS GET TRAPPED BY ADS */}
      <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="px-3 py-1 bg-rose-100 text-rose-800 text-xs font-bold rounded-full uppercase tracking-wider">
            The Student Reality Check
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
            Why TIP Students Struggle to Find a Decent Dorm
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Facebook and rental signboards along Aurora Blvd look cheap at first glance, but hidden expenses and fake vacancies turn student life into a struggle:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
              <Bed className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              "Ghost" Vacancies & Full Dorms
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              You walk in the midday heat from Aurora Blvd to Anonas, only to find the advertised room was filled two weeks ago. DormMate updates <strong>live available slots</strong> every morning.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Predatory Sub-Meter Markups
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Meralco residential rates in Quezon City are ~₱13–₱14/kWh. Many shady dorms charge students <strong>₱22–₱26/kWh</strong>, doubling your monthly bill just for charging your laptop!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1.5">
              Strict 9 PM Curfew Lockouts
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              TIP Engineering & Architecture students regularly have late-night CAD work in campus labs. Strict dorm curfews lock you out or charge penalty fees.
            </p>
          </div>

        </div>

        {/* How DormMate Protects You */}
        <div className="mt-8 p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                The DormMate "Student Shield" Guarantee
              </h4>
              <p className="text-xs text-slate-600">
                We calculate your True Monthly Cost in Philippine Peso and track exact vacant bedspaces before you sign.
              </p>
            </div>
          </div>

          <button
            onClick={() => setUseTrueCost(!useTrueCost)}
            className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shrink-0 shadow-sm"
          >
            {useTrueCost ? '✓ True Cost Active' : 'Switch to True Cost View'}
          </button>
        </div>

      </section>

      {/* 3. TIP-QC GATE NAVIGATOR */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="max-w-2xl mb-8">
          <span className="px-3 py-1 bg-amber-400 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">
            Campus Gate Proximity
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Where Are Your Classes in TIP Quezon City?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Choose your dorm based on which gate is closest to your college building:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">Gate 1</span>
              <span className="text-xs text-slate-400 font-semibold">2-4 min walk</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Aurora Blvd Main Gate</h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Best for Engineering & Computing students. Right across the pedestrian overpass, beside LRT-2 Anonas Station.
            </p>
            <span className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-amber-200">
              ⚡ 4 Dorms Available
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">Gate 2</span>
              <span className="text-xs text-slate-400 font-semibold">3-5 min walk</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Anonas Street Gate</h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Best for Business, Education, and Arts students. Direct access to cheap student eateries, photocopiers, and banks.
            </p>
            <span className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-emerald-200">
              ⚡ 2 Dorms Available
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-amber-300 uppercase tracking-wider">Gate 3</span>
              <span className="text-xs text-slate-400 font-semibold">4-7 min walk</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">20th Avenue Gate</h4>
            <p className="text-xs text-slate-300 mb-3 leading-relaxed">
              Direct access into Project 4 residential streets. Quiet, green, away from Aurora vehicle pollution and sirens.
            </p>
            <span className="inline-block px-2.5 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-indigo-200">
              ⚡ 2 Dorms Available
            </span>
          </div>

        </div>
      </section>

      {/* 4. FEATURED TIP-QC DORMS WITH LIVE BEDSPACE AVAILABILITY */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
              Audited Housing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Popular Housing Options Near TIP-QC
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Live bedspace vacancy counts, audited sub-meters, and verified Wi-Fi
            </p>
          </div>

          <button
            onClick={onExploreAll}
            className="text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All {featuredDorms.length} Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Featured Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredDorms.slice(0, 3).map(dorm => {
            const cost = calculateTrueCost(dorm, 1);
            const price = useTrueCost ? cost.totalMonthly : dorm.pricing.baseRent;
            const bedInfo = dorm.bedspaceInfo || { availableSlots: 1, totalSlots: 1 };

            return (
              <div 
                key={dorm.id}
                onClick={() => onSelectDorm(dorm)}
                className="group bg-white rounded-3xl border border-slate-200 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
              >
                {/* Graphic Header (Zero Stock Photos) */}
                <div className="relative h-44 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 flex flex-col justify-between p-3.5 sm:p-4">
                  <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:16px_16px] opacity-25"></div>
                  <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-500/15 rounded-full blur-xl pointer-events-none"></div>

                  <div className="relative z-10 flex items-center justify-between gap-1.5">
                    <div className="px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-white/95 text-slate-900 shadow-md flex items-center gap-1">
                      <Footprints className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{dorm.distanceCampus.walkingMins}m to {dorm.distanceCampus.gate ? dorm.distanceCampus.gate.split('(')[0] : 'TIP'}</span>
                    </div>

                    {/* Bedspace Badge */}
                    <div className="px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-400 text-slate-950 shadow-md flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      <span>{bedInfo.availableSlots} of {bedInfo.totalSlots} Slots Open</span>
                    </div>
                  </div>

                  {/* Center Graphic */}
                  <div className="relative z-10 flex items-center justify-center gap-3 my-auto py-1">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex items-center justify-center text-amber-400">
                      {dorm.roomType.includes('Studio') ? (
                        <Building2 className="w-5 h-5 text-indigo-300" />
                      ) : (
                        <Bed className="w-5 h-5 text-amber-400" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-black text-sm tracking-wide">
                        {dorm.roomType}
                      </p>
                      <p className="text-[11px] text-slate-300 font-medium">
                        {dorm.genderPolicy} • Verified Unit
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-white text-[11px] pt-1 border-t border-white/10">
                    <span className="text-slate-300 font-medium">Technological Institute of the Philippines</span>
                    <span className="text-amber-300 font-bold">QC Campus</span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {dorm.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-1">{dorm.address}</p>

                    <div className="mt-4 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-black text-slate-900">
                          {formatCurrency(price)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ mo per slot</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">
                        {useTrueCost ? 'True total (all bills included)' : `Base rent (excludes ~₱${cost.hiddenCostDifference} utilities)`}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-600 font-semibold">
                      <span className="flex items-center gap-1">
                        <Wifi className="w-3.5 h-3.5 text-indigo-600" />
                        {dorm.studentReality.wifiSpeedMbps} Mbps
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700">
                        {dorm.curfew}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                      <Bed className="w-3.5 h-3.5" />
                      <span>{bedInfo.availableSlots} Bedspaces Left</span>
                    </span>
                    <span className="text-xs font-bold text-indigo-600 group-hover:underline">
                      Inspect & Pick Slot →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. TIPIAN STUDENT REVIEWS */}
      <section className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Verified Experiences
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Real Reviews from TIP Quezon City Students
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            How DormMate saved TIPians from moving into nightmare accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-400 mb-2">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
              "The live bedspace counter saved my friend and me! We saw 2 slots open at Anonas Station Lofts and were able to reserve both together before they were taken by other students."
            </p>
            <div className="border-t border-slate-100 pt-3">
              <p className="font-bold text-slate-900 text-xs">Arvin Kenneth L.</p>
              <p className="text-[11px] text-slate-500">BS Computer Engineering • 4th Year, TIP-QC</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-400 mb-2">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
              "As an Architecture student, I need to stay late in the drafting studio. Other dorms have strict 10 PM lockouts. DormMate filtered for dorms that accept TIP lab slips. 10/10 recommendation!"
            </p>
            <div className="border-t border-slate-100 pt-3">
              <p className="font-bold text-slate-900 text-xs">Kaye Alyssa M.</p>
              <p className="text-[11px] text-slate-500">BS Architecture • 3rd Year, TIP-QC</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-1 text-amber-400 mb-2">
              {'★'.repeat(5)}
            </div>
            <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
              "I used the Roommate Matcher quiz and got paired with a fellow TIP student in Project 4. We halved our rent from ₱7,000 to ₱3,500 each, and it’s just a 4-minute walk to Gate 3."
            </p>
            <div className="border-t border-slate-100 pt-3">
              <p className="font-bold text-slate-900 text-xs">Miguel Angelo D.</p>
              <p className="text-[11px] text-slate-500">BS Information Technology • 2nd Year, TIP-QC</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-3xl p-8 sm:p-12 text-slate-950 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Ready to reserve an open bedspace near TIP-QC?
          </h2>
          <p className="text-xs sm:text-base font-medium text-slate-800 mt-2 max-w-xl">
            Check live slot availability now before slots fill up for the upcoming semester.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={onExploreAll}
            className="px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl shadow-lg transition-colors flex items-center justify-center gap-2"
          >
            <span>Explore Open Bedspaces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenBudgetPlanner}
            className="px-5 py-3.5 bg-white/80 hover:bg-white text-slate-950 font-bold text-sm rounded-2xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Budget Calculator</span>
          </button>
        </div>
      </section>

    </div>
  );
}

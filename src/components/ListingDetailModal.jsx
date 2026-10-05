import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Footprints, 
  Bike, 
  Bus, 
  ShieldCheck, 
  Wifi, 
  Volume2, 
  Zap, 
  Droplets, 
  Moon, 
  Users, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  DollarSign,
  Bed,
  Check,
  Clock,
  Building2
} from 'lucide-react';
import { calculateTrueCost, calculateMoveInCash, formatCurrency } from '../utils/costCalculations';

export default function ListingDetailModal({
  dorm,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenScheduleTour
}) {
  if (!dorm) return null;

  const bedInfo = dorm.bedspaceInfo || {
    totalSlots: 2,
    availableSlots: 1,
    slotType: 'Bedspace',
    slots: [
      { id: 'b1', label: 'Bed 1', status: 'Occupied', occupiedBy: 'Current Student' },
      { id: 'b2', label: 'Bed 2', status: 'Available', note: 'Immediate move-in' }
    ]
  };

  const [roommatesCount, setRoommatesCount] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(
    bedInfo.slots.find(s => s.status === 'Available')?.id || ''
  );
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  // Dynamic cost based on roommates split in Philippine Peso
  const cost = calculateTrueCost(dorm, roommatesCount);
  const moveIn = calculateMoveInCash(dorm, roommatesCount);

  const selectedSlotObj = bedInfo.slots.find(s => s.id === selectedSlot);

  // Pre-filled protective TIPian student inquiry message including chosen bedspace
  const inquiryMessage = `Magandang araw po ${dorm.landlord.name},

I am a student from TIP Quezon City looking for a dorm near campus. I saw that you currently have ${bedInfo.availableSlots} of ${bedInfo.totalSlots} bedspaces available in ${dorm.title} (${dorm.roomType}).
${selectedSlotObj ? `Specifically, I am interested in reserving: ${selectedSlotObj.label}.` : ''}

Before booking a viewing, could you please confirm:
1. Is the Meralco submeter billed at the official residential rate (₱13.50/kWh)?
2. What is the security deposit refund policy upon lease end?
3. Do you accommodate TIP students with late evening thesis/lab passes?

Can we schedule a room viewing this week? Maraming salamat po!`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(inquiryMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  const handleSimulateSend = () => {
    setInquirySent(true);
    setTimeout(() => setInquirySent(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Sticky Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
              {dorm.roomType}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-slate-100 text-slate-700">
              {dorm.genderPolicy}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(dorm.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                isFavorite 
                  ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{isFavorite ? 'Saved' : 'Save'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
          
          {/* Verified Room Layout & Blueprint Profile (No Fake Stock Photos) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 border border-indigo-900/50 p-5 sm:p-7 text-white shadow-xl">
            {/* Background architectural grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px] opacity-25"></div>
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Badges bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-md flex items-center gap-1.5">
                    <Bed className="w-3.5 h-3.5" />
                    <span>{bedInfo.availableSlots} of {bedInfo.totalSlots} Bedspaces Available</span>
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white/10 text-white border border-white/15 backdrop-blur-md flex items-center gap-1.5">
                    <Footprints className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{dorm.distanceCampus.walkingMins}m walk to {dorm.distanceCampus.gate}</span>
                  </span>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Physical Unit Audited for TIP-QC</span>
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="max-w-2xl">
                <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                  {dorm.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 font-normal leading-relaxed">
                  {dorm.tagline}
                </p>
                <p className="text-xs text-indigo-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                  <span>{dorm.address}</span>
                </p>
              </div>

              {/* Architectural Blueprint Spec Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Room Blueprint</span>
                  <span className="text-xs sm:text-sm font-bold text-white mt-0.5 block">{dorm.roomType}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Slot Configuration</span>
                  <span className="text-xs sm:text-sm font-bold text-amber-300 mt-0.5 block">{bedInfo.slotType}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Curfew Policy</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-300 mt-0.5 block">{dorm.curfewStrict ? dorm.curfewHours : '24/7 Thesis Access'}</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 border border-white/10">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase block">Meralco Meter</span>
                  <span className="text-xs sm:text-sm font-bold text-indigo-300 mt-0.5 block">Official Submeter</span>
                </div>
              </div>

              {/* Free Viewing Note */}
              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 rounded-2xl p-3 border border-white/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <p className="text-xs text-slate-200">
                    <strong>Zero-Hidden-Bills Policy:</strong> We do not show misleading stock photos. Inspect the actual unit in person before committing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenScheduleTour(dorm)}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs transition-colors shrink-0 flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Free Inspection</span>
                </button>
              </div>

            </div>
          </div>

          {/* 🌟 LIVE BEDSPACE VACANCY & SLOT TRACKER CARD */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-300/80 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-3.5 pb-3 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                    <span>Live Bedspace Availability:</span>
                    <span className="text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-md text-xs font-black">
                      {bedInfo.availableSlots} of {bedInfo.totalSlots} Slots Open
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{bedInfo.lastVerified}</span>
                  </p>
                </div>
              </div>

              <span className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-black ${
                bedInfo.availableSlots === 1 
                  ? 'bg-rose-500 text-white animate-pulse' 
                  : 'bg-emerald-600 text-white'
              }`}>
                {bedInfo.availableSlots === 1 ? '🚨 Hurry! Last Slot' : 'Available for Move-in'}
              </span>
            </div>

            {/* Individual Slot Selection */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">
                Select an available bedspace to inquire about:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {bedInfo.slots.map(slot => {
                  const isAvailable = slot.status === 'Available';
                  const isSelected = selectedSlot === slot.id;

                  return (
                    <div
                      key={slot.id}
                      onClick={() => isAvailable && setSelectedSlot(slot.id)}
                      className={`p-3 rounded-xl border text-xs transition-all flex items-start justify-between gap-2 ${
                        !isAvailable
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-75'
                          : isSelected
                          ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-300 cursor-pointer'
                          : 'bg-white/80 border-amber-200 hover:border-amber-400 cursor-pointer'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${isAvailable ? 'text-slate-900' : 'text-slate-500'}`}>
                            {slot.label}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                            isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {slot.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {isAvailable ? slot.note : `Occupied by ${slot.occupiedBy}`}
                        </p>
                      </div>

                      {isAvailable && (
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                          isSelected ? 'bg-amber-500 text-slate-950 border-amber-600' : 'border-slate-300'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Title, Address & Commute Breakdown */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  {dorm.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{dorm.address}</span>
                </p>
              </div>

              {dorm.verifiedLandlord && (
                <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl self-start">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-[11px] sm:text-xs font-bold text-emerald-800">
                    Audited Meralco Submeter
                  </span>
                </div>
              )}
            </div>

            {/* Commute to TIP QC Gates */}
            <div className="mt-3.5 p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-amber-950 uppercase tracking-wider block mb-1">
                  Proximity to TIP Quezon City:
                </span>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-800">
                  <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                    <Footprints className="w-3.5 h-3.5 text-indigo-600" />
                    <strong>{dorm.distanceCampus.walkingMins} mins</strong> walk to {dorm.distanceCampus.gate}
                  </span>
                  <span className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-amber-200 shadow-2xs">
                    <Bike className="w-3.5 h-3.5 text-emerald-600" />
                    <strong>{dorm.distanceCampus.bikingMins} mins</strong> bike
                  </span>
                  {dorm.distanceCampus.monthlyTransitCost > 0 ? (
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-slate-600 shadow-2xs">
                      Jeep fare: ₱{dorm.distanceCampus.monthlyTransitCost}/mo
                    </span>
                  ) : (
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-emerald-200 text-emerald-800 font-bold shadow-2xs">
                      ₱0 commute fare (Walk to TIP!)
                    </span>
                  )}
                </div>
              </div>
              <span className="text-[11px] sm:text-xs text-amber-900 font-semibold">
                Save ~₱1,200/mo living within walking distance
              </span>
            </div>
          </div>

          {/* THE CORE SOLUTION: Smart True-Cost Breakdown & Roommate Splitter in PHP */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                    TIPian Student Protection
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    The True Monthly Living Cost
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Itemized Meralco submeter estimates, Manila Water, Converge/PLDT fiber, and laundry.
                </p>
              </div>

              {/* Interactive Roommate Split Controls */}
              <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 self-start">
                <div className="text-[10px] sm:text-[11px] font-medium text-slate-300 mb-1 flex items-center justify-between">
                  <span>Split with Roommates:</span>
                  <strong className="text-amber-300 ml-2">{roommatesCount} {roommatesCount === 1 ? 'Person' : 'People'}</strong>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRoommatesCount(num)}
                      className={`w-7 sm:w-8 h-7 rounded-lg text-xs font-bold transition-all ${
                        roommatesCount === num
                          ? 'bg-amber-400 text-slate-950 shadow-sm'
                          : 'bg-white/5 text-slate-300 hover:bg-white/20'
                      }`}
                    >
                      {num}P
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Cost Breakdown Line Items Table */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-center">
              
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Base Room Rent ({roommatesCount > 1 ? `1/${roommatesCount} split` : 'Solo'}):</span>
                  <span className="font-bold text-white text-sm">{formatCurrency(cost.baseRentPerPerson)}/mo</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Meralco (Submeter Estimate):
                  </span>
                  <span className="font-medium text-amber-200">+{formatCurrency(cost.electricityPerPerson)}/mo</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-400" />
                    Manila Water & Sanitation:
                  </span>
                  <span className="font-medium text-blue-200">+{formatCurrency(cost.waterPerPerson)}/mo</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300 flex items-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5 text-indigo-400" />
                    Fiber Internet (PLDT/Converge):
                  </span>
                  <span className="font-medium text-emerald-300">
                    {cost.wifiPerPerson === 0 ? 'FREE (Included)' : `+${formatCurrency(cost.wifiPerPerson)}/mo`}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-slate-300">Laundry Expense Estimate:</span>
                  <span className="font-medium text-slate-300">+{formatCurrency(cost.laundry)}/mo</span>
                </div>
                {cost.transitCost > 0 && (
                  <div className="flex justify-between py-1.5 border-b border-white/10">
                    <span className="text-slate-300">Daily Jeepney Fare:</span>
                    <span className="font-medium text-slate-300">+{formatCurrency(cost.transitCost)}/mo</span>
                  </div>
                )}
              </div>

              {/* Summary Total Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-center">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-slate-300">
                  True Monthly Cost per TIPian
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 my-1.5">
                  {formatCurrency(cost.totalMonthly)}
                  <span className="text-xs sm:text-sm font-normal text-slate-300"> / mo</span>
                </div>
                
                <div className="text-xs text-amber-300 bg-amber-500/10 border border-amber-400/30 rounded-xl p-2.5 mt-2.5 text-left">
                  <p className="font-bold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 shrink-0" />
                    Sub-Meter Rate Audit:
                  </p>
                  <p className="text-[11px] text-slate-200 mt-0.5">
                    {dorm.pricing.submeterMarkup}
                  </p>
                </div>

                {/* Day-1 Move-in Cash Required in PHP */}
                <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-300">Day 1 Cash Required:</span>
                  <span className="font-bold text-amber-300 text-sm">
                    {formatCurrency(moveIn.totalCashNeeded)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 text-left">
                  Includes {dorm.pricing.advanceMonths} mo advance + {dorm.pricing.depositMonths} mo security deposit + {formatCurrency(moveIn.utilityBond)} meter deposit.
                </p>
              </div>

            </div>
          </div>

          {/* Student Reality Scorecard (Wi-Fi, Noise, Rules) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Reality Ratings */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-indigo-600" />
                <span>Audited Student Reality Scores</span>
              </h4>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Wi-Fi Peak Hours Speed:</span>
                    <strong className="text-indigo-600">{dorm.studentReality.wifiSpeedMbps} Mbps Tested</strong>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-indigo-600 h-2 rounded-full" 
                      style={{ width: `${Math.min(100, dorm.studentReality.wifiSpeedMbps / 4)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-700 mb-1">
                    <span>Finals Study Silence Score:</span>
                    <strong className="text-emerald-600">{dorm.studentReality.noiseScore} / 10</strong>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-600 h-2 rounded-full" 
                      style={{ width: `${dorm.studentReality.noiseScore * 10}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1">{dorm.studentReality.noiseLevel}</p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 space-y-1 text-slate-600 text-[11px]">
                  <p><strong>🚿 Water:</strong> {dorm.studentReality.waterPressure}</p>
                  <p><strong>📶 Signal:</strong> {dorm.studentReality.cellSignal}</p>
                  <p><strong>🍳 Cooking:</strong> {dorm.studentReality.cookingAllowed}</p>
                </div>
              </div>
            </div>

            {/* Curfew & House Rules */}
            <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <Moon className="w-4 h-4 text-violet-600" />
                <span>Curfew & Daily Freedom Rules</span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Curfew Policy:
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-0.5">
                    {dorm.curfew}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hours: {dorm.curfewHours}
                  </p>
                </div>

                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Contract Term:
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">
                    {dorm.pricing.leaseTerms}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Amenities Grid */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-2.5">
              Included Amenities & Study Facilities
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-medium text-slate-700">
              {dorm.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="line-clamp-1">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Roommate Openings */}
          {dorm.roommateOpenings.length > 0 && (
            <div className="bg-violet-50/70 border border-violet-200 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-2.5">
                <Users className="w-4 h-4 text-violet-700" />
                <h4 className="font-bold text-violet-950 text-sm">
                  Active TIPian Looking for a Roommate
                </h4>
              </div>

              {dorm.roommateOpenings.map((roomie, idx) => (
                <div key={idx} className="bg-white rounded-xl p-3 sm:p-4 border border-violet-100 shadow-2xs">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="font-bold text-slate-900 text-sm">{roomie.name}</span>
                    <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded-full">
                      {roomie.major}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic mb-2.5">
                    "{roomie.bio}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 text-[10px] font-medium text-slate-500">
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md">🛌 {roomie.sleepHabit}</span>
                    <span className="bg-slate-100 px-2 py-0.5 rounded-md">🧹 {roomie.cleanliness}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Direct Landlord Inquiry Generator */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-600" />
                  <span>Direct Landlord Inquiry (Protective Draft)</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Pre-drafted with your selected bedspace slot & key questions about Meralco submeter rates.
                </p>
              </div>

              <button
                onClick={handleCopyMessage}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 self-start transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedMessage ? 'Copied!' : 'Copy Draft'}</span>
              </button>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] sm:text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
              {inquiryMessage}
            </div>

            {/* Direct Contact & Tour Action */}
            <div className="mt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-2.5 text-xs text-slate-600 w-full sm:w-auto">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center font-bold text-amber-800 shrink-0">
                  {dorm.landlord.name[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{dorm.landlord.name}</p>
                  <p className="text-[10px] text-slate-400">⚡ {dorm.landlord.responseRate} • ⭐ {dorm.landlord.rating}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={handleSimulateSend}
                  disabled={inquirySent}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    inquirySent 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-200'
                  }`}
                >
                  {inquirySent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Inquiry Sent!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-4 h-4" />
                      <span>Inquire for this Slot</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onOpenScheduleTour(dorm)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Book Free Viewing</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

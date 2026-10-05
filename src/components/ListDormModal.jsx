import React, { useState } from 'react';
import { 
  X, 
  PlusCircle, 
  ShieldCheck, 
  DollarSign, 
  Footprints, 
  Wifi, 
  Moon, 
  CheckCircle2,
  Bed
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TIP_QC_INFO } from '../data/dormsData';

export default function ListDormModal({
  onClose,
  onAddDorm
}) {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    gate: 'Gate 1 (Aurora Blvd)',
    roomType: 'Shared 2-Bed',
    genderPolicy: 'Co-Ed',
    curfew: 'No Curfew (24/7 Access)',
    curfewStrict: false,
    curfewHours: '24/7 Access',
    totalSlots: 2,
    availableSlots: 1,
    baseRent: 3500, // PHP
    electricityEstimate: 600, // PHP
    waterEstimate: 200, // PHP
    wifiFee: 0,
    wifiSpeedMbps: 200,
    walkingMins: 4,
    depositMonths: 1,
    submeterMarkup: 'Official Meralco Submeter (₱13.50/kWh, No Markup)',
    description: '',
    landlordName: '',
    landlordPhone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.address) return;

    const newDorm = {
      id: `dorm-custom-${Date.now()}`,
      title: formData.title,
      tagline: 'Student-verified listing near TIP Quezon City',
      address: formData.address,
      coords: { x: 46 + Math.floor(Math.random() * 12), y: 40 + Math.floor(Math.random() * 12) },
      images: [],
      roomType: formData.roomType,
      genderPolicy: formData.genderPolicy,
      curfew: formData.curfew,
      curfewStrict: formData.curfewStrict,
      curfewHours: formData.curfewHours,
      verifiedLandlord: true,
      superhost: false,
      floodFree: true,
      bedspaceInfo: {
        totalSlots: Number(formData.totalSlots),
        availableSlots: Number(formData.availableSlots),
        slotType: `${formData.roomType} Bedspace`,
        urgency: Number(formData.availableSlots) === 1 ? 'high' : 'normal',
        lastVerified: 'Verified just now',
        slots: Array.from({ length: Number(formData.totalSlots) }, (_, i) => ({
          id: `slot-${i + 1}`,
          label: `Bedspace Slot ${i + 1}`,
          status: i < Number(formData.availableSlots) ? 'Available' : 'Occupied',
          note: i < Number(formData.availableSlots) ? 'Ready for move-in' : 'Occupied by current student'
        }))
      },
      distanceCampus: {
        gate: formData.gate,
        walkingMins: Number(formData.walkingMins),
        bikingMins: Math.max(1, Math.round(Number(formData.walkingMins) / 2)),
        transitMins: 0,
        monthlyTransitCost: 0
      },
      pricing: {
        baseRent: Number(formData.baseRent),
        electricityEstimate: Number(formData.electricityEstimate),
        waterEstimate: Number(formData.waterEstimate),
        wifiFee: Number(formData.wifiFee),
        laundryFeeEstimate: 250,
        hoaDues: 0,
        depositMonths: Number(formData.depositMonths),
        advanceMonths: 1,
        submeterMarkup: formData.submeterMarkup,
        leaseTerms: 'Flexible Semester Contract'
      },
      studentReality: {
        wifiSpeedMbps: Number(formData.wifiSpeedMbps),
        noiseLevel: 'Quiet Study Environment for TIPians',
        noiseScore: 9.0,
        landlordScore: 4.8,
        safetyRating: 9.7,
        waterPressure: 'Good Water Pressure',
        cellSignal: 'Full 5G',
        cookingAllowed: 'Induction / Microwave Allowed'
      },
      amenities: [
        'High-Speed Wi-Fi',
        'Study Desk & Chair',
        'CCTV & Security',
        'Filtered Drinking Water',
        'Air Conditioner'
      ],
      roommateOpenings: [],
      description: formData.description || 'Verified student residence near TIP Quezon City.',
      landlord: {
        name: formData.landlordName || 'Dorm Landlord',
        phone: formData.landlordPhone || '+63 917 000 0000',
        responseRate: '15 mins response',
        rating: 4.9,
        reviewsCount: 1
      }
    };

    onAddDorm(newDorm);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                List a Dorm / Bedspace for TIP-QC Students
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500">
                Transparent Meralco submeter & bedspace slot declaration
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Dorm / Apartment Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anonas Residences"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-600 font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Nearest TIP-QC Gate *</label>
              <select
                value={formData.gate}
                onChange={e => setFormData({ ...formData, gate: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-600 font-medium cursor-pointer"
              >
                <option value="Gate 1 (Aurora Blvd)">Gate 1 (Aurora Blvd Main Gate)</option>
                <option value="Gate 2 (Anonas St)">Gate 2 (Anonas St Gate)</option>
                <option value="Gate 3 (20th Ave Gate)">Gate 3 (20th Ave Gate / Project 4)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Street Address near TIP-QC *</label>
            <input
              type="text"
              required
              placeholder="e.g. 910 Aurora Blvd, Project 4, Quezon City"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-600 font-medium"
            />
          </div>

          {/* Bedspace Availability Declaration */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl">
            <span className="font-extrabold text-amber-950 uppercase tracking-wider block text-[10px] mb-2 flex items-center gap-1.5">
              <Bed className="w-3.5 h-3.5 text-amber-700" />
              <span>Bedspace Slot Capacity</span>
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Total Bedspaces in Unit</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.totalSlots}
                  onChange={e => setFormData({ ...formData, totalSlots: Number(e.target.value) })}
                  className="w-full p-2 bg-white border border-amber-300 rounded-lg font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Currently Available Slots</label>
                <input
                  type="number"
                  min="1"
                  max={formData.totalSlots}
                  value={formData.availableSlots}
                  onChange={e => setFormData({ ...formData, availableSlots: Number(e.target.value) })}
                  className="w-full p-2 bg-white border border-amber-300 rounded-lg font-bold text-amber-900"
                />
              </div>
            </div>
          </div>

          {/* Pricing & Utility Declarations in PHP */}
          <div className="p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <span className="font-bold text-slate-900 uppercase tracking-wider block text-[10px] sm:text-[11px]">
              Transparent Cost Declarations (in Philippine Peso ₱)
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <label className="block text-slate-500 font-semibold mb-1">Base Rent (₱/mo)</label>
                <input
                  type="number"
                  required
                  min="1000"
                  step="100"
                  value={formData.baseRent}
                  onChange={e => setFormData({ ...formData, baseRent: Number(e.target.value) })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Est. Meralco (₱)</label>
                <input
                  type="number"
                  value={formData.electricityEstimate}
                  onChange={e => setFormData({ ...formData, electricityEstimate: Number(e.target.value) })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Est. Water (₱)</label>
                <input
                  type="number"
                  value={formData.waterEstimate}
                  onChange={e => setFormData({ ...formData, waterEstimate: Number(e.target.value) })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-semibold mb-1">Deposit (Months)</label>
                <input
                  type="number"
                  min="1"
                  max="2"
                  value={formData.depositMonths}
                  onChange={e => setFormData({ ...formData, depositMonths: Number(e.target.value) })}
                  className="w-full p-2 bg-white border border-slate-200 rounded-lg font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-semibold mb-1">Meralco Sub-meter Rate Guarantee</label>
              <input
                type="text"
                value={formData.submeterMarkup}
                onChange={e => setFormData({ ...formData, submeterMarkup: e.target.value })}
                className="w-full p-2 bg-white border border-slate-200 rounded-lg font-medium"
              />
            </div>
          </div>

          {/* Student Living Realities */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Room Type</label>
              <select
                value={formData.roomType}
                onChange={e => setFormData({ ...formData, roomType: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              >
                <option value="Shared 4-Bed Quad">Shared 4-Bed Quad</option>
                <option value="Shared 2-Bed">Shared 2-Bed</option>
                <option value="Solo Studio">Solo Studio</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Gender Policy</label>
              <select
                value={formData.genderPolicy}
                onChange={e => setFormData({ ...formData, genderPolicy: e.target.value })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              >
                <option value="Co-Ed">Co-Ed</option>
                <option value="Female Only">Female Only</option>
                <option value="Male Only">Male Only</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Walk to TIP (min)</label>
              <input
                type="number"
                min="1"
                max="30"
                value={formData.walkingMins}
                onChange={e => setFormData({ ...formData, walkingMins: Number(e.target.value) })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Wi-Fi (Mbps)</label>
              <input
                type="number"
                min="20"
                value={formData.wifiSpeedMbps}
                onChange={e => setFormData({ ...formData, wifiSpeedMbps: Number(e.target.value) })}
                className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Curfew & Late Lab Policy</label>
            <input
              type="text"
              placeholder="e.g. No Curfew (RFID) OR 11 PM with TIP lab slip accepted"
              value={formData.curfew}
              onChange={e => setFormData({ 
                ...formData, 
                curfew: e.target.value,
                curfewStrict: e.target.value.toLowerCase().includes('pm')
              })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Name</label>
              <input
                type="text"
                placeholder="e.g. Kuya Rey"
                value={formData.landlordName}
                onChange={e => setFormData({ ...formData, landlordName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Phone (09...)</label>
              <input
                type="text"
                placeholder="e.g. 0917 123 4567"
                value={formData.landlordPhone}
                onChange={e => setFormData({ ...formData, landlordPhone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-900 font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish TIP-QC Listing</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

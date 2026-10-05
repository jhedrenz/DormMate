import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  CheckCircle2, 
  Video, 
  MapPin, 
  ShieldAlert,
  Bed,
  Building2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScheduleTourModal({
  dorm,
  onClose
}) {
  const [tourType, setTourType] = useState('in-person');
  const [tourDate, setTourDate] = useState('Today, 4:30 PM (After TIP classes)');
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!dorm) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/65 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full max-h-[95vh] sm:max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 sm:py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                Book a Free Room Inspection
              </h3>
              <p className="text-[10px] sm:text-xs text-slate-500">Zero fees, no commitment required</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 sm:p-2 text-slate-400 hover:text-slate-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 text-xs">
          
          {booked ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg sm:text-xl font-black text-slate-900">
                Viewing Schedule Confirmed!
              </h4>
              <p className="text-slate-600 max-w-xs mx-auto leading-relaxed">
                {dorm.landlord.name} has been notified of your {tourType} viewing on <strong>{tourDate}</strong>.
              </p>
              
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-left text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  What to check during the viewing:
                </p>
                <p>• Inspect the Meralco submeter seal</p>
                <p>• Plug in your phone charger to test bedroom outlets</p>
                <p>• Run Speedtest.net inside the bedroom with the door shut!</p>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-slate-900 to-indigo-950 flex flex-col items-center justify-center text-amber-400 shrink-0 border border-slate-700 shadow-inner">
                  {dorm.roomType.includes('Studio') ? (
                    <Building2 className="w-5 h-5 text-indigo-300" />
                  ) : (
                    <Bed className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-slate-900 truncate">{dorm.title}</h4>
                  <p className="text-slate-500 text-[11px] truncate">{dorm.address}</p>
                </div>
              </div>

              {/* In Person vs Video */}
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Viewing Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTourType('in-person')}
                    className={`p-2.5 sm:p-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${
                      tourType === 'in-person'
                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-black'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-amber-600" />
                    <span>In-Person Walk</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTourType('live-video')}
                    className={`p-2.5 sm:p-3 rounded-xl border font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all ${
                      tourType === 'live-video'
                        ? 'bg-amber-50 border-amber-500 text-amber-950 font-black'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Video className="w-4 h-4 text-indigo-600" />
                    <span>Video Call</span>
                  </button>
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Convenient Time Slot</label>
                <select
                  value={tourDate}
                  onChange={e => setTourDate(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:outline-indigo-600 cursor-pointer"
                >
                  <option value="Today, 4:30 PM (After TIP classes)">Today, 4:30 PM (After TIP classes)</option>
                  <option value="Today, 6:00 PM">Today, 6:00 PM</option>
                  <option value="Tomorrow, 11:30 AM (Class break)">Tomorrow, 11:30 AM (Class break)</option>
                  <option value="Tomorrow, 4:00 PM">Tomorrow, 4:00 PM</option>
                  <option value="Saturday, 2:00 PM (Weekend)">Saturday, 2:00 PM (Weekend)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Your Full Name (TIP Student)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Christian Santos"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Number (09...)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 0917 123 4567"
                  value={studentPhone}
                  onChange={e => setStudentPhone(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-indigo-600 font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Confirm Free Room Inspection</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}

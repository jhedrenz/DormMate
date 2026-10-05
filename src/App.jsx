import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import HeroSection from './components/HeroSection';
import TrueCostExplainer from './components/TrueCostExplainer';
import FilterBar from './components/FilterBar';
import ListingCard from './components/ListingCard';
import ListingDetailModal from './components/ListingDetailModal';
import ComparisonModal from './components/ComparisonModal';
import RoommateMatcherModal from './components/RoommateMatcherModal';
import BudgetOptimizerModal from './components/BudgetOptimizerModal';
import StudentChecklistModal from './components/StudentChecklistModal';
import ScheduleTourModal from './components/ScheduleTourModal';
import ListDormModal from './components/ListDormModal';
import FavoritesModal from './components/FavoritesModal';
import CampusMapView from './components/CampusMapView';

import { INITIAL_DORMS, TIP_QC_INFO } from './data/dormsData';
import { calculateTrueCost } from './utils/costCalculations';
import { 
  GraduationCap, 
  Scale, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle,
  Home,
  Compass,
  MapPin,
  Users,
  Heart,
  Bed
} from 'lucide-react';

const AVAILABLE_TAGS = [
  { id: 'nearGate1', label: '🚶 Near Gate 1 (Aurora)' },
  { id: 'nearGate2', label: '🚶 Near Gate 2 (Anonas)' },
  { id: 'nearGate3', label: '🚶 Near Gate 3 (20th Ave)' },
  { id: 'noCurfew', label: '🌙 No Curfew / Thesis-Friendly' },
  { id: 'gigabitWifi', label: '⚡ 200+ Mbps Fiber' },
  { id: 'kitchen', label: '🍳 Cooking Allowed' },
  { id: 'floodFree', label: '🛡️ Flood-Free Audited' }
];

export default function App() {
  const [dorms, setDorms] = useState(() => {
    const saved = localStorage.getItem('dormmate_custom_dorms');
    return saved ? JSON.parse(saved) : INITIAL_DORMS;
  });

  const [activeView, setActiveView] = useState('landing'); // 'landing' | 'grid' | 'map'
  const [useTrueCost, setUseTrueCost] = useState(true); // Default to True Cost
  const [searchQuery, setSearchQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState(9000); // ₱9,000 PHP default
  const [selectedGate, setSelectedGate] = useState('all');
  const [minSlotsFilter, setMinSlotsFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState([]);
  
  // Filters
  const [roomTypeFilter, setRoomTypeFilter] = useState('all');
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [curfewOnlyNoCurfew, setCurfewOnlyNoCurfew] = useState(false);
  const [sortBy, setSortBy] = useState('mostSlots');

  // Modals & Shortlists
  const [savedFavorites, setSavedFavorites] = useState(() => {
    const saved = localStorage.getItem('dormmate_favorites');
    return saved ? JSON.parse(saved) : ['dorm-1', 'dorm-4'];
  });
  const [comparisonList, setComparisonList] = useState(['dorm-1', 'dorm-4']);

  const [selectedDormForDetail, setSelectedDormForDetail] = useState(null);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [isRoommateQuizOpen, setIsRoommateQuizOpen] = useState(false);
  const [isBudgetPlannerOpen, setIsBudgetPlannerOpen] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isAddListingOpen, setIsAddListingOpen] = useState(false);
  const [scheduleTourDorm, setScheduleTourDorm] = useState(null);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem('dormmate_favorites', JSON.stringify(savedFavorites));
  }, [savedFavorites]);

  const toggleFavorite = (dormId) => {
    setSavedFavorites(prev => 
      prev.includes(dormId) ? prev.filter(id => id !== dormId) : [...prev, dormId]
    );
  };

  const toggleCompare = (dormId) => {
    setComparisonList(prev => {
      if (prev.includes(dormId)) {
        return prev.filter(id => id !== dormId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 dorms side-by-side.');
        return prev;
      }
      return [...prev, dormId];
    });
  };

  const toggleTag = (tagId) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setMaxBudget(12000);
    setSelectedGate('all');
    setMinSlotsFilter('all');
    setRoomTypeFilter('all');
    setDistanceFilter('all');
    setGenderFilter('all');
    setCurfewOnlyNoCurfew(false);
    setSelectedTags([]);
    setSortBy('mostSlots');
  };

  const handleAddDorm = (newDorm) => {
    const updated = [newDorm, ...dorms];
    setDorms(updated);
    localStorage.setItem('dormmate_custom_dorms', JSON.stringify(updated));
  };

  // Filter & Sort Logic for TIP QC dorms
  const filteredDorms = useMemo(() => {
    return dorms.filter(dorm => {
      // Gate match
      if (selectedGate !== 'all' && dorm.distanceCampus.gate !== selectedGate) {
        return false;
      }

      // Min Available Bedspaces Slot Filter
      if (minSlotsFilter !== 'all') {
        const slotsNeeded = Number(minSlotsFilter);
        const available = dorm.bedspaceInfo?.availableSlots || 0;
        if (available < slotsNeeded) return false;
      }

      // Price limit in Philippine Peso
      const cost = calculateTrueCost(dorm, 1);
      const evaluatedPrice = useTrueCost ? cost.totalMonthly : dorm.pricing.baseRent;
      if (evaluatedPrice > maxBudget) return false;

      // Search keyword
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = dorm.title.toLowerCase().includes(query);
        const matchAddress = dorm.address.toLowerCase().includes(query);
        const matchDesc = dorm.description.toLowerCase().includes(query);
        const matchAmenity = dorm.amenities.some(a => a.toLowerCase().includes(query));
        if (!matchTitle && !matchAddress && !matchDesc && !matchAmenity) return false;
      }

      // Room Type
      if (roomTypeFilter !== 'all' && dorm.roomType !== roomTypeFilter) return false;

      // Distance
      if (distanceFilter !== 'all') {
        const maxDist = Number(distanceFilter);
        if (dorm.distanceCampus.walkingMins > maxDist) return false;
      }

      // Gender
      if (genderFilter !== 'all' && dorm.genderPolicy !== genderFilter) return false;

      // Curfew
      if (curfewOnlyNoCurfew && dorm.curfewStrict) return false;

      // Tags
      if (selectedTags.includes('nearGate1') && dorm.distanceCampus.gate !== 'Gate 1 (Aurora Blvd)') return false;
      if (selectedTags.includes('nearGate2') && dorm.distanceCampus.gate !== 'Gate 2 (Anonas St)') return false;
      if (selectedTags.includes('nearGate3') && dorm.distanceCampus.gate !== 'Gate 3 (20th Ave Gate)') return false;
      if (selectedTags.includes('noCurfew') && dorm.curfewStrict) return false;
      if (selectedTags.includes('gigabitWifi') && dorm.studentReality.wifiSpeedMbps < 200) return false;
      if (selectedTags.includes('kitchen') && !dorm.studentReality.cookingAllowed.toLowerCase().includes('kitchen')) return false;
      if (selectedTags.includes('floodFree') && !dorm.floodFree) return false;

      return true;
    }).sort((a, b) => {
      const costA = calculateTrueCost(a, 1).totalMonthly;
      const costB = calculateTrueCost(b, 1).totalMonthly;

      if (sortBy === 'mostSlots') {
        const slotsA = a.bedspaceInfo?.availableSlots || 0;
        const slotsB = b.bedspaceInfo?.availableSlots || 0;
        return slotsB - slotsA;
      }
      if (sortBy === 'trueCostAsc') return costA - costB;
      if (sortBy === 'baseRentAsc') return a.pricing.baseRent - b.pricing.baseRent;
      if (sortBy === 'walkingDistance') return a.distanceCampus.walkingMins - b.distanceCampus.walkingMins;
      if (sortBy === 'wifiSpeed') return b.studentReality.wifiSpeedMbps - a.studentReality.wifiSpeedMbps;
      return 0;
    });
  }, [
    dorms,
    selectedGate,
    minSlotsFilter,
    useTrueCost,
    maxBudget,
    searchQuery,
    roomTypeFilter,
    distanceFilter,
    genderFilter,
    curfewOnlyNoCurfew,
    selectedTags,
    sortBy
  ]);

  const comparisonDorms = useMemo(() => {
    return dorms.filter(d => comparisonList.includes(d.id));
  }, [dorms, comparisonList]);

  const favoriteDorms = useMemo(() => {
    return dorms.filter(d => savedFavorites.includes(d.id));
  }, [dorms, savedFavorites]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 pb-16 sm:pb-0 overflow-x-hidden">
      
      {/* Top Navbar */}
      <Navbar
        useTrueCost={useTrueCost}
        setUseTrueCost={setUseTrueCost}
        comparisonList={comparisonList}
        onOpenComparison={() => setIsComparisonModalOpen(true)}
        savedFavorites={savedFavorites}
        onOpenFavorites={() => setIsFavoritesModalOpen(true)}
        onOpenRoommateQuiz={() => setIsRoommateQuizOpen(true)}
        onOpenBudgetPlanner={() => setIsBudgetPlannerOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        onOpenAddListing={() => setIsAddListingOpen(true)}
        activeView={activeView}
        setActiveView={setActiveView}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 flex-1 w-full">
        
        {/* VIEW 1: Dedicated Landing Page */}
        {activeView === 'landing' ? (
          <LandingPage
            featuredDorms={dorms}
            onExploreAll={() => setActiveView('grid')}
            onSelectDorm={(dorm) => setSelectedDormForDetail(dorm)}
            onOpenRoommateQuiz={() => setIsRoommateQuizOpen(true)}
            onOpenBudgetPlanner={() => setIsBudgetPlannerOpen(true)}
            onOpenChecklist={() => setIsChecklistOpen(true)}
            useTrueCost={useTrueCost}
            setUseTrueCost={setUseTrueCost}
          />
        ) : (
          /* VIEW 2: Browse / Explore Dorms */
          <div>
            {/* Hero & Search Bar */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              maxBudget={maxBudget}
              setMaxBudget={setMaxBudget}
              useTrueCost={useTrueCost}
              selectedTags={selectedTags}
              toggleTag={toggleTag}
              availableTags={AVAILABLE_TAGS}
              selectedGate={selectedGate}
              setSelectedGate={setSelectedGate}
            />

            {/* True Cost Explainer Banner */}
            <TrueCostExplainer
              useTrueCost={useTrueCost}
              setUseTrueCost={setUseTrueCost}
            />

            {/* Filter & Sorting Controls */}
            <FilterBar
              roomTypeFilter={roomTypeFilter}
              setRoomTypeFilter={setRoomTypeFilter}
              distanceFilter={distanceFilter}
              setDistanceFilter={setDistanceFilter}
              genderFilter={genderFilter}
              setGenderFilter={setGenderFilter}
              curfewOnlyNoCurfew={curfewOnlyNoCurfew}
              setCurfewOnlyNoCurfew={setCurfewOnlyNoCurfew}
              selectedGate={selectedGate}
              setSelectedGate={setSelectedGate}
              minSlotsFilter={minSlotsFilter}
              setMinSlotsFilter={setMinSlotsFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              totalResults={filteredDorms.length}
              resetFilters={resetFilters}
            />

            {/* View Switch: Grid or Map */}
            {activeView === 'map' ? (
              <CampusMapView
                dorms={filteredDorms}
                useTrueCost={useTrueCost}
                onSelectDorm={(dorm) => setSelectedDormForDetail(dorm)}
              />
            ) : (
              <div>
                {filteredDorms.length === 0 ? (
                  <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-xs max-w-xl mx-auto my-8">
                    <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="w-7 sm:w-8 h-7 sm:h-8" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5">No matching TIP-QC bedspaces found</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-5">
                      Try lowering your minimum bedspaces filter or raising your budget slider to see other available units in Project 4 or along Aurora Blvd.
                    </p>
                    <button
                      onClick={resetFilters}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
                    {filteredDorms.map(dorm => (
                      <ListingCard
                        key={dorm.id}
                        dorm={dorm}
                        useTrueCost={useTrueCost}
                        isFavorite={savedFavorites.includes(dorm.id)}
                        onToggleFavorite={toggleFavorite}
                        isCompared={comparisonList.includes(dorm.id)}
                        onToggleCompare={toggleCompare}
                        onSelectDorm={(d) => setSelectedDormForDetail(d)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TIPian Tenant Rights Section */}
            <section className="bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-xs mb-12">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    TIPian Tenant Protection Rights (Quezon City)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Essential guidelines before signing a lease along Aurora Blvd & Anonas
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Meralco Sub-meter Laws
                  </h4>
                  <p className="leading-relaxed">
                    Under Philippine energy regulations, landlords are strictly prohibited from reselling Meralco residential electricity at inflated profit rates (e.g. ₱25/kWh). You have the right to inspect the submeter calibration seal.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    Thesis Laboratory Curfews
                  </h4>
                  <p className="leading-relaxed">
                    TIP-QC Engineering & Architecture students regularly have late laboratory requirements. Always ensure your dorm honors official TIP lab slips or provides 24/7 keycard or biometric access.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Deposit Refund Documentation
                  </h4>
                  <p className="leading-relaxed">
                    Always demand an official written receipt for your 1-month advance and deposit. Take timestamped photos and video of all walls, faucets, and submeters on your move-in day.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* Floating Comparison Dock (Active when dorms are selected) */}
      {comparisonList.length > 0 && (
        <div className="fixed bottom-16 sm:bottom-4 left-1/2 -translate-x-1/2 z-30 max-w-lg w-[94%] bg-slate-950/95 backdrop-blur-md text-white rounded-2xl p-2.5 px-3.5 shadow-2xl border border-slate-800 flex items-center justify-between gap-2.5 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate">
                {comparisonList.length} {comparisonList.length === 1 ? 'Dorm' : 'Dorms'} Selected
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                Compare true costs & open bedspaces
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsComparisonModalOpen(true)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-extrabold transition-all shadow-md flex items-center gap-1"
            >
              <span>Compare</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setComparisonList([])}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              title="Clear"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 py-1.5 px-3 flex items-center justify-around text-slate-600 shadow-lg">
        <button
          onClick={() => setActiveView('landing')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
            activeView === 'landing' ? 'text-amber-600 font-extrabold' : 'text-slate-500'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          onClick={() => setActiveView('grid')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
            activeView === 'grid' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span className="text-[10px]">Dorms</span>
        </button>

        <button
          onClick={() => setActiveView('map')}
          className={`flex flex-col items-center gap-0.5 p-1 transition-colors ${
            activeView === 'map' ? 'text-indigo-600 font-extrabold' : 'text-slate-500'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[10px]">Map</span>
        </button>

        <button
          onClick={() => setIsRoommateQuizOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1 text-slate-500 hover:text-indigo-600"
        >
          <Users className="w-4 h-4" />
          <span className="text-[10px]">Roomie</span>
        </button>

        <button
          onClick={() => setIsFavoritesModalOpen(true)}
          className="relative flex flex-col items-center gap-0.5 p-1 text-slate-500 hover:text-rose-600"
        >
          <Heart className={`w-4 h-4 ${savedFavorites.length > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
          <span className="text-[10px]">Saved</span>
          {savedFavorites.length > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center">
              {savedFavorites.length}
            </span>
          )}
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 px-4 text-center text-xs text-slate-500 mb-12 sm:mb-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-500" />
            <span className="font-black text-slate-900 text-sm">DormMate</span>
            <span>— Exclusively for Technological Institute of the Philippines (Quezon City)</span>
          </div>
          <p>© 2026 DormMate • Aurora Blvd • Anonas • Project 4 • Live Bedspace Vacancy Tracker</p>
        </div>
      </footer>

      {/* Modals */}
      {selectedDormForDetail && (
        <ListingDetailModal
          dorm={selectedDormForDetail}
          onClose={() => setSelectedDormForDetail(null)}
          isFavorite={savedFavorites.includes(selectedDormForDetail.id)}
          onToggleFavorite={toggleFavorite}
          onOpenScheduleTour={(d) => {
            setSelectedDormForDetail(null);
            setScheduleTourDorm(d);
          }}
        />
      )}

      {isComparisonModalOpen && (
        <ComparisonModal
          comparisonDorms={comparisonDorms}
          onClose={() => setIsComparisonModalOpen(false)}
          onRemoveFromCompare={toggleCompare}
          onSelectDorm={(d) => {
            setIsComparisonModalOpen(false);
            setSelectedDormForDetail(d);
          }}
        />
      )}

      {isRoommateQuizOpen && (
        <RoommateMatcherModal
          dorms={dorms}
          onClose={() => setIsRoommateQuizOpen(false)}
          onSelectDorm={(d) => {
            setIsRoommateQuizOpen(false);
            setSelectedDormForDetail(d);
          }}
        />
      )}

      {isBudgetPlannerOpen && (
        <BudgetOptimizerModal
          dorms={dorms}
          onClose={() => setIsBudgetPlannerOpen(false)}
          onSelectDorm={(d) => {
            setIsBudgetPlannerOpen(false);
            setSelectedDormForDetail(d);
          }}
        />
      )}

      {isChecklistOpen && (
        <StudentChecklistModal
          onClose={() => setIsChecklistOpen(false)}
        />
      )}

      {isAddListingOpen && (
        <ListDormModal
          onClose={() => setIsAddListingOpen(false)}
          onAddDorm={handleAddDorm}
        />
      )}

      {scheduleTourDorm && (
        <ScheduleTourModal
          dorm={scheduleTourDorm}
          onClose={() => setScheduleTourDorm(null)}
        />
      )}

      {isFavoritesModalOpen && (
        <FavoritesModal
          favorites={favoriteDorms}
          onClose={() => setIsFavoritesModalOpen(false)}
          onRemoveFavorite={toggleFavorite}
          onSelectDorm={(d) => {
            setIsFavoritesModalOpen(false);
            setSelectedDormForDetail(d);
          }}
          useTrueCost={useTrueCost}
          onOpenComparison={() => {
            setIsFavoritesModalOpen(false);
            setComparisonList(favoriteDorms.slice(0, 3).map(d => d.id));
            setIsComparisonModalOpen(true);
          }}
        />
      )}

    </div>
  );
}

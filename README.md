# 🎓 DormMate — Student Housing Finder for TIP Quezon City

> **Exclusively built for Technological Institute of the Philippines - Quezon City (TIP-QC) students.**

Standard student housing ads along Aurora Blvd and Anonas only display the base rent, blindsiding TIPians with marked-up Meralco electricity submeters, mandatory Wi-Fi fees, and unexpected commute expenses. **DormMate** is designed to provide complete transparency before signing a lease.

---

## 📍 Project Location (Desktop)
```text
C:\Users\Jhed Cruz\Desktop\DormMate
```

---

## 🚀 How to Run in Visual Studio Code (VS Code)

### Step 1: Open in VS Code
1. Open **VS Code**.
2. Click **File** > **Open Folder...** (or press `Ctrl + K, Ctrl + O`).
3. Select your Desktop folder:
   ```text
   C:\Users\Jhed Cruz\Desktop\DormMate
   ```

### Step 2: Open Terminal & Start Dev Server
1. Open the integrated terminal in VS Code:
   - Press **`Ctrl + ~`** (backtick) or go to **Terminal** > **New Terminal**.
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Hold `Ctrl` and click the link displayed in the terminal:
   ```text
   http://localhost:5173/
   ```

---

## 📱 Mobile-First Features & How to Test on Phones

### 1. Test All Phone Dimensions on Your Computer
1. With the app open in your browser (`http://localhost:5173/`), press **`F12`** (or right-click > **Inspect**).
2. Press **`Ctrl + Shift + M`** (Toggle Device Toolbar).
3. Select any phone from the top dropdown (iPhone SE, iPhone 14/15 Pro Max, Samsung Galaxy, Pixel).
4. The interface adapts with touch-friendly cards and a **Mobile Bottom Navigation Bar** (`Home`, `Dorms`, `Map`, `Roomie`, `Saved`).

### 2. Open on Your Physical Smartphone (Same Wi-Fi)
1. In your VS Code terminal, run:
   ```bash
   npm run dev -- --host
   ```
2. Look for the **Network** URL in the terminal (e.g., `http://192.168.1.X:5173/`).
3. Open Google Chrome or Safari on your phone, enter that URL, and use DormMate directly on your mobile device!

---

## 🇵🇭 Philippine Peso (₱) & Local TIP-QC Features

### 1. 🛏️ Live Bedspace Vacancy & Slot Tracker
- Real-time vacant slot counters (e.g. *1 of 2 Open*, *2 of 4 Open*).
- Interactive **Bedspace Slot Visualizer** (pick *Lower Deck* vs *Upper Deck*).
- Auto-generates slot-specific inquiry messages to landlords.

### 2. ⚡ "True Monthly Cost" vs Base Rent Toggle
- Items and audits official Meralco submeter rates (₱13.50/kWh baseline), Manila Water, Converge/PLDT fiber internet, laundry tokens, and daily jeepney/tricycle fares.
- Alerts TIPians whenever an advertised ₱2,500 bedspace actually balloons to ₱4,500+ due to predatory ₱25/kWh submeters.

### 3. 🏛️ TIP-QC Campus Gate Proximity Navigation
- **Gate 1 (Aurora Blvd Main Gate):** Near LRT-2 Anonas station and Aurora jeepneys.
- **Gate 2 (Anonas St Gate):** Near student food hubs, printing shops, and banks.
- **Gate 3 (20th Avenue Gate):** Quiet, residential Project 4 streets away from highway noise.

### 4. 🌙 Thesis & Laboratory Curfew Transparency
- Highlights dorms with 24/7 RFID keycard access or dormitories that honor official TIP-QC evening laboratory passes.

### 5. 👥 TIPian Roommate Compatibility Matcher
- 4-step lifestyle quiz (Sleep schedule, study quiet needs, cleanliness routine, visitor policy) to pair students with classmates in Engineering, Architecture, and Computing to safely split rent.

### 6. 💰 Move-In Day 1 Cash Calculator
- Automatically calculates total upfront cash required (Advance rent + 1-month security deposit + ₱1,000 submeter bond).

---

## 🛠️ Project Structure
```text
DormMate/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx         # Dedicated TIP-QC Landing Page
│   │   ├── Navbar.jsx              # Responsive Navbar & Mobile Drawer
│   │   ├── HeroSection.jsx         # Search, Gate Selector & Budget Slider
│   │   ├── TrueCostExplainer.jsx   # Sticker Price vs True Cost Guide
│   │   ├── FilterBar.jsx           # Gate, Room Type, Slots & Sort Filter
│   │   ├── ListingCard.jsx         # Dorm Card with Live Bedspace Badges
│   │   ├── ListingDetailModal.jsx  # Interactive Bedspace Slot Selector
│   │   ├── ComparisonModal.jsx     # Side-by-Side Comparison Matrix
│   │   ├── RoommateMatcherModal.jsx# TIPian Compatibility Quiz
│   │   ├── BudgetOptimizerModal.jsx# Safe 45% Allowance Calculator (₱)
│   │   ├── StudentChecklistModal.jsx# QC Move-in Inspection Checklist
│   │   ├── ScheduleTourModal.jsx   # Free Viewing Booking Sheet
│   │   ├── ListDormModal.jsx       # Landlord Declaration Form
│   │   ├── FavoritesModal.jsx      # Saved Shortlist & Print Summary
│   │   └── CampusMapView.jsx       # Interactive TIP Gate Radius Map
│   ├── data/
│   │   └── dormsData.js            # TIP-QC Housing Dataset & Submeter Audits
│   ├── utils/
│   │   └── costCalculations.js     # True Cost & Move-In Cash Logic (₱)
│   ├── App.jsx                     # Root State & View Orchestrator
│   ├── main.jsx                    # React Root Entry Point
│   └── index.css                   # Tailwind CSS v4 & Plus Jakarta Sans
├── index.html                      # HTML5 Template with TIP-QC Meta
├── package.json                    # Dependencies & Scripts
├── vite.config.js                  # Vite & Tailwind Plugins Configuration
└── README.md                       # Project Documentation & Guide
```

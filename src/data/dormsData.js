export const TIP_QC_INFO = {
  id: 'tip-qc',
  name: 'Technological Institute of the Philippines - Quezon City',
  shortName: 'TIP - QC',
  address: '938 Aurora Blvd, Cubao / Project 4, Quezon City',
  gates: [
    { name: 'Gate 1 (Aurora Blvd Main Gate)', desc: 'Near LRT-2 Anonas & Aurora jeepneys' },
    { name: 'Gate 2 (Anonas St Gate)', desc: 'Direct access to food hubs, eateries & banks' },
    { name: 'Gate 3 (20th Avenue Gate)', desc: 'Direct access to Project 4 quiet residential zones' }
  ],
  coords: { x: 50, y: 48 }
};

export const INITIAL_DORMS = [
  {
    id: 'dorm-1',
    title: 'The TIPian Hive - Engineering & Tech Residences',
    tagline: 'Quiet study pods with 24/7 drafting tables, 3 min walk to TIP Gate 1',
    address: '912 Aurora Blvd (beside Anonas LRT-2), Project 4, Quezon City',
    coords: { x: 48, y: 43 },
    images: [],
    roomType: 'Shared 2-Bed',
    genderPolicy: 'Co-Ed (Separate Floors)',
    curfew: 'No Curfew (RFID Keycard for Thesis Students)',
    curfewStrict: false,
    curfewHours: '24/7 Access with Biometrics',
    verifiedLandlord: true,
    superhost: true,
    floodFree: true,
    bedspaceInfo: {
      totalSlots: 2,
      availableSlots: 1,
      slotType: 'Twin Single Beds',
      urgency: 'high', // 'high' | 'medium' | 'normal'
      lastVerified: 'Verified 1 hour ago',
      slots: [
        { id: 's1', label: 'Bed A (Near Window & Desk)', status: 'Occupied', occupiedBy: 'Christian (3rd Yr CpE)' },
        { id: 's2', label: 'Bed B (Near Bookshelf & Power Outlet)', status: 'Available', note: 'Ready for immediate move-in' }
      ]
    },
    distanceCampus: {
      gate: 'Gate 1 (Aurora Blvd)',
      walkingMins: 3,
      bikingMins: 1,
      transitMins: 0,
      monthlyTransitCost: 0
    },
    pricing: {
      baseRent: 4800, // PHP
      electricityEstimate: 750, // Meralco submeter
      waterEstimate: 200, // Manila Water
      wifiFee: 0, // Included 300 Mbps Converge Fiber
      laundryFeeEstimate: 300,
      hoaDues: 0,
      depositMonths: 1,
      advanceMonths: 1,
      submeterMarkup: 'Official Meralco Residential Rate (₱13.50/kWh, Zero Markup)',
      leaseTerms: 'Per Semester (5 months) or Academic Year (10 months)'
    },
    studentReality: {
      wifiSpeedMbps: 300,
      noiseLevel: 'Quiet (Acoustic Foam Study Pods for CAD & Coding)',
      noiseScore: 9.6,
      landlordScore: 4.9,
      safetyRating: 9.9,
      waterPressure: 'Strong (Manila Water with 2-stage booster pump)',
      cellSignal: 'Full 5G (Smart & Globe towers nearby)',
      cookingAllowed: 'Induction Cooker & Microwave Allowed in Room'
    },
    amenities: [
      '300 Mbps Converge Fiber with Dual Backup',
      'Drafting Table & Ergonomic Mesh Chairs',
      'Individual Study Lamps & 4 Power Sockets per Desk',
      'Inverter Aircon with Digital Timer',
      'Heavy-Duty Generator (100% Brownout Protection for Projects)',
      '24/7 Security Guard & High-Definition CCTV',
      'Drinking Water Refill Station (Free)',
      'Rooftop Laundry Hanger Area'
    ],
    roommateOpenings: [
      {
        name: 'Christian Bautista',
        major: 'BS Computer Engineering (3rd Year, TIP-QC)',
        sleepHabit: 'Night Owl (codes until 1:30 AM)',
        cleanliness: 'Very Organized & Quiet',
        bio: 'Looking for a fellow TIP engineering or IT student to share this 2-bed unit. Halved rent is only ₱2,400/mo each!'
      }
    ],
    description: 'Purpose-built for TIP Quezon City engineering, architecture, and computing students. Only 3 minutes on foot to TIP Gate 1 along Aurora Blvd. Only 1 bedspace remaining for this semester.',
    landlord: {
      name: 'Engr. Manuel Santos (TIP QC Alumnus)',
      phone: '+63 917 555 4321',
      responseRate: '10 min response time',
      rating: 4.9,
      reviewsCount: 42
    }
  },
  {
    id: 'dorm-2',
    title: 'Anonas Station Lofts & Bedspaces',
    tagline: 'Budget-friendly female dormitory right across Anonas Food Hub',
    address: '45 Anonas Street (near LRT-2 Station), Project 3, Quezon City',
    coords: { x: 53, y: 54 },
    images: [],
    roomType: 'Shared 4-Bed Quad',
    genderPolicy: 'Female Only',
    curfew: '11:00 PM Gate Lock (Guard Assisted with Late Slip for TIP Labs)',
    curfewStrict: true,
    curfewHours: '11:00 PM - 5:00 AM (Late lab pass honored)',
    verifiedLandlord: true,
    superhost: false,
    floodFree: true,
    bedspaceInfo: {
      totalSlots: 4,
      availableSlots: 2,
      slotType: 'Double-deck Bunk Bedspaces',
      urgency: 'medium',
      lastVerified: 'Verified 2 hours ago',
      slots: [
        { id: 'b1', label: 'Lower Deck 1', status: 'Occupied', occupiedBy: 'Danica (2nd Yr Accountancy)' },
        { id: 'b2', label: 'Upper Deck 1', status: 'Occupied', occupiedBy: 'Sarah (1st Yr IE)' },
        { id: 'b3', label: 'Lower Deck 2', status: 'Available', note: 'Includes privacy curtain & private study lamp' },
        { id: 'b4', label: 'Upper Deck 2', status: 'Available', note: 'Extra head clearance with wall fan' }
      ]
    },
    distanceCampus: {
      gate: 'Gate 2 (Anonas St)',
      walkingMins: 5,
      bikingMins: 2,
      transitMins: 0,
      monthlyTransitCost: 0
    },
    pricing: {
      baseRent: 2900,
      electricityEstimate: 450,
      waterEstimate: 180,
      wifiFee: 150,
      laundryFeeEstimate: 250,
      hoaDues: 0,
      depositMonths: 1,
      advanceMonths: 1,
      submeterMarkup: 'Shared Meralco Bill with Photocopy of Meralco Statement',
      leaseTerms: 'Flexible 5-Month Semester Contract'
    },
    studentReality: {
      wifiSpeedMbps: 150,
      noiseLevel: 'Moderate (Study groups during exam weeks)',
      noiseScore: 8.4,
      landlordScore: 4.7,
      safetyRating: 9.8,
      waterPressure: 'Good (Central overhead water tank)',
      cellSignal: 'Strong 5G on Smart & DITO',
      cookingAllowed: 'Communal Kitchen on 2nd Floor (Gas stoves & Rice Cookers)'
    },
    amenities: [
      'Biometric Fingerprint Gate Entry',
      'Bunk Bed with Privacy Curtain, Foam & Reading Light',
      'Lockable Steel Locker for Laptops',
      'Female Dorm Warden on Duty 24/7',
      'Mineral Water Dispenser (Hot & Cold)',
      'Air-conditioned Study Lounge',
      'Drop-off Laundry Service Partner (₱25/kilo)'
    ],
    roommateOpenings: [
      {
        name: 'Maria Danica Perez',
        major: 'BS Accountancy (2nd Year, TIP-QC)',
        sleepHabit: 'Early Bird (wakes 6:00 AM)',
        cleanliness: 'Spotless & Neat',
        bio: 'Studying for departmental exams. Need a clean, studious female roommate who respects sleep hours.'
      }
    ],
    description: 'Safe, gated female-only student dorm just 5 minutes walk from TIP Gate 2. 2 of 4 bedspace slots open now in Room 204.',
    landlord: {
      name: 'Tita Carmen Mendoza',
      phone: '+63 928 889 1234',
      responseRate: '30 mins response',
      rating: 4.7,
      reviewsCount: 29
    }
  },
  {
    id: 'dorm-3',
    title: 'Aurora Studio Suites (Private Solo Living)',
    tagline: 'Modern solo studio with private bath & kitchen for focused TIPians',
    address: '960 Aurora Blvd (near 20th Ave junction), Cubao, Quezon City',
    coords: { x: 44, y: 38 },
    images: [],
    roomType: 'Solo Studio',
    genderPolicy: 'Co-Ed',
    curfew: 'No Curfew (Digital PIN Smart Lock)',
    curfewStrict: false,
    curfewHours: '24/7 Total Independence',
    verifiedLandlord: true,
    superhost: true,
    floodFree: true,
    bedspaceInfo: {
      totalSlots: 1,
      availableSlots: 1,
      slotType: 'Private Studio Unit',
      urgency: 'high',
      lastVerified: 'Verified today',
      slots: [
        { id: 'u302', label: 'Unit 302 (3rd Floor Solo)', status: 'Available', note: 'Corner unit with soundproof windows & private balcony' }
      ]
    },
    distanceCampus: {
      gate: 'Gate 1 (Aurora Blvd)',
      walkingMins: 6,
      bikingMins: 2,
      transitMins: 0,
      monthlyTransitCost: 0
    },
    pricing: {
      baseRent: 8500,
      electricityEstimate: 1200,
      waterEstimate: 250,
      wifiFee: 0,
      laundryFeeEstimate: 0,
      hoaDues: 0,
      depositMonths: 1.5,
      advanceMonths: 1,
      submeterMarkup: 'Digital Submeter at Exact Meralco Tariff',
      leaseTerms: 'Academic Year or 6-Month Renewal'
    },
    studentReality: {
      wifiSpeedMbps: 200,
      noiseLevel: 'Ultra Quiet (Double-glazed acoustic windows against Aurora traffic)',
      noiseScore: 9.7,
      landlordScore: 5.0,
      safetyRating: 9.9,
      waterPressure: 'High Pressure Multi-point Water Heater',
      cellSignal: 'Full 5G on all networks',
      cookingAllowed: 'Full Kitchenette (Range hood, Induction, Inverter Refrigerator)'
    },
    amenities: [
      'Private Bathroom with Water Heater',
      'Automatic In-Unit Washing Machine',
      'Dedicated 200 Mbps Fiber WiFi (No sharing with neighbors)',
      'Custom Architecture Drafting Table / Dual Monitor Desk',
      'Inverter Refrigerator & Microwave',
      'Smart Door Lock with PIN & Fingerprint',
      'CCTV & Fire Sprinkler System'
    ],
    roommateOpenings: [],
    description: 'Premier solo studio for Architecture or Engineering students needing complete silence and workstation setups. Only 1 unit currently vacant.',
    landlord: {
      name: 'Engr. Patrick Dy',
      phone: '+63 905 771 9922',
      responseRate: 'Under 15 mins',
      rating: 5.0,
      reviewsCount: 35
    }
  },
  {
    id: 'dorm-4',
    title: 'Project 4 Student Haven (20th Ave Residence)',
    tagline: 'Quiet neighborhood living away from main road pollution, near Gate 3',
    address: '78 20th Avenue cor. P. Tuazon, Project 4, Quezon City',
    coords: { x: 58, y: 46 },
    images: [],
    roomType: 'Shared 2-Bed',
    genderPolicy: 'Co-Ed (Separate Wings)',
    curfew: '11:30 PM Curfew (Security Intercom after hours)',
    curfewStrict: false,
    curfewHours: '11:30 PM with night buzzer',
    verifiedLandlord: true,
    superhost: true,
    floodFree: true,
    bedspaceInfo: {
      totalSlots: 2,
      availableSlots: 1,
      slotType: 'Twin Room Bedspaces',
      urgency: 'high',
      lastVerified: 'Verified 4 hours ago',
      slots: [
        { id: 'p1', label: 'Bed 1 (Study Desk Corner)', status: 'Occupied', occupiedBy: 'Jerome (4th Yr EE)' },
        { id: 'p2', label: 'Bed 2 (Garden View)', status: 'Available', note: 'Facing quiet courtyard garden' }
      ]
    },
    distanceCampus: {
      gate: 'Gate 3 (20th Ave Gate)',
      walkingMins: 4,
      bikingMins: 2,
      transitMins: 0,
      monthlyTransitCost: 0
    },
    pricing: {
      baseRent: 3800,
      electricityEstimate: 550,
      waterEstimate: 180,
      wifiFee: 100,
      laundryFeeEstimate: 200,
      hoaDues: 0,
      depositMonths: 1,
      advanceMonths: 1,
      submeterMarkup: 'Strictly Regulated Meralco Submeter (₱13.80/kWh)',
      leaseTerms: 'Semester Basis (5 Months)'
    },
    studentReality: {
      wifiSpeedMbps: 250,
      noiseLevel: 'Very Quiet (Peaceful Project 4 residential street)',
      noiseScore: 9.3,
      landlordScore: 4.8,
      safetyRating: 9.5,
      waterPressure: 'Excellent (Deepwell + Manila Water backup)',
      cellSignal: 'Strong 5G',
      cookingAllowed: 'Spacious Kitchen on Ground Floor'
    },
    amenities: [
      'High-Speed Mesh Wi-Fi 6',
      'Solid Hardwood Study Desks with Bookshelf',
      'Free Filtered Alkaline Drinking Water',
      'Gated Motorcycle & Bicycle Parking',
      'Outdoor Garden Study Courtyard',
      '24/7 CCTV & Gated Compound',
      'Individual Clothesline area'
    ],
    roommateOpenings: [
      {
        name: 'Jerome Castillo',
        major: 'BS Electrical Engineering (4th Year, TIP-QC)',
        sleepHabit: 'Night Owl (studying for board exam)',
        cleanliness: 'Very Clean & Courteous',
        bio: 'Graduating student reviewing for subjects. Peaceful environment guaranteed.'
      }
    ],
    description: 'Located in the peaceful residential heart of Project 4, just 4 minutes brisk walk to TIP Gate 3 along 20th Avenue. Exactly 1 bedspace remaining.',
    landlord: {
      name: 'Nanay Lita & Sir Arthur Reyes',
      phone: '+63 918 333 7744',
      responseRate: 'Instant response',
      rating: 4.8,
      reviewsCount: 38
    }
  },
  {
    id: 'dorm-5',
    title: 'Cubao-Aurora Quad Bedspaces for Men',
    tagline: 'Most affordable men\'s bedspace with free drinking water & Wi-Fi',
    address: '890 Aurora Blvd (near TIP Gate 1 pedestrian overpass), QC',
    coords: { x: 50, y: 40 },
    images: [],
    roomType: 'Shared 4-Bed Quad',
    genderPolicy: 'Male Only',
    curfew: '12:00 Midnight Curfew',
    curfewStrict: true,
    curfewHours: '12:00 AM - 5:00 AM',
    verifiedLandlord: true,
    superhost: false,
    floodFree: true,
    bedspaceInfo: {
      totalSlots: 4,
      availableSlots: 3,
      slotType: 'Bunk Bedspaces for Men',
      urgency: 'normal',
      lastVerified: 'Verified 30 mins ago',
      slots: [
        { id: 'c1', label: 'Bunk 1 Lower', status: 'Occupied', occupiedBy: 'Kyle (1st Yr IT)' },
        { id: 'c2', label: 'Bunk 1 Upper', status: 'Available', note: 'Clean foam & private locker included' },
        { id: 'c3', label: 'Bunk 2 Lower', status: 'Available', note: 'Closest to electric socket' },
        { id: 'c4', label: 'Bunk 2 Upper', status: 'Available', note: 'Wide clothes rack overhead' }
      ]
    },
    distanceCampus: {
      gate: 'Gate 1 (Aurora Blvd)',
      walkingMins: 2,
      bikingMins: 1,
      transitMins: 0,
      monthlyTransitCost: 0
    },
    pricing: {
      baseRent: 2500,
      electricityEstimate: 400,
      waterEstimate: 150,
      wifiFee: 0,
      laundryFeeEstimate: 200,
      hoaDues: 0,
      depositMonths: 1,
      advanceMonths: 1,
      submeterMarkup: 'Sub-metered Flat Rate split among roommates',
      leaseTerms: 'Flexible Month-to-Month or Per Semester'
    },
    studentReality: {
      wifiSpeedMbps: 120,
      noiseLevel: 'Lively (Collaborative tech discussions)',
      noiseScore: 7.9,
      landlordScore: 4.3,
      safetyRating: 9.1,
      waterPressure: 'Standard Pressure with overhead tank',
      cellSignal: 'Excellent 5G',
      cookingAllowed: 'Microwave & Induction cooker provided'
    },
    amenities: [
      'Free 120 Mbps Wi-Fi',
      'Steel Double-Deck with Heavy Duty Mattress & Privacy Curtain',
      'Individual Steel Locker (bring own padlock)',
      'Wall Fan & Exhaust Air Circulation',
      'Drinking Water Station',
      'Night Caretaker on Duty',
      'Directly across TIP Gate 1'
    ],
    roommateOpenings: [
      {
        name: 'Kyle Gabriel',
        major: 'BS Information Technology (1st Year, TIP-QC)',
        sleepHabit: 'Flexible / Gamer',
        cleanliness: 'Neat bed area',
        bio: 'Freshman looking for fellow TIPians to share rent and review together for programming subjects.'
      }
    ],
    description: 'Directly across the pedestrian overpass from TIP Gate 1. 3 vacant bedspaces ready for move-in today—great for study buddy groups!',
    landlord: {
      name: 'Kuya Ronald Dorm Services',
      phone: '+63 947 123 4567',
      responseRate: '1 hr response',
      rating: 4.3,
      reviewsCount: 22
    }
  },
  {
    id: 'dorm-6',
    title: 'Katipunan-Aurora Edge Condominium Share',
    tagline: 'Hotel-quality student living with swimming pool, gym & high-floor study room',
    address: 'Aurora Blvd cor. Katipunan Ave (1 jeepney or 8 min walk to TIP QC)',
    coords: { x: 38, y: 32 },
    images: [],
    roomType: 'Shared 2-Bed',
    genderPolicy: 'Co-Ed',
    curfew: 'No Curfew (24/7 Concierge & Security)',
    curfewStrict: false,
    curfewHours: '24/7 Access',
    verifiedLandlord: true,
    superhost: true,
    floodFree: true,
    bedspaceInfo: {
      totalSlots: 2,
      availableSlots: 1,
      slotType: 'Condo Master Bedroom Bedspace',
      urgency: 'high',
      lastVerified: 'Verified 5 hours ago',
      slots: [
        { id: 'k1', label: 'Twin Bed 1 (Balcony Side)', status: 'Occupied', occupiedBy: 'Joshua (3rd Yr Arki)' },
        { id: 'k2', label: 'Twin Bed 2 (Pool View)', status: 'Available', note: 'Includes built-in wardrobe & desk space' }
      ]
    },
    distanceCampus: {
      gate: 'Gate 1 (Aurora Blvd)',
      walkingMins: 8,
      bikingMins: 3,
      transitMins: 3,
      monthlyTransitCost: 260
    },
    pricing: {
      baseRent: 6200,
      electricityEstimate: 850,
      waterEstimate: 220,
      wifiFee: 0,
      laundryFeeEstimate: 300,
      hoaDues: 0,
      depositMonths: 1,
      advanceMonths: 1,
      submeterMarkup: 'Direct Meralco Billing from Admin',
      leaseTerms: '10 Months Academic Year Contract'
    },
    studentReality: {
      wifiSpeedMbps: 400,
      noiseLevel: 'Ultra Quiet (High-floor unit away from traffic)',
      noiseScore: 9.8,
      landlordScore: 4.9,
      safetyRating: 9.9,
      waterPressure: 'Strong High-Pressure Shower',
      cellSignal: 'Full 5G',
      cookingAllowed: 'Full Kitchen (Built-in induction stove + exhaust)'
    },
    amenities: [
      'Free 400 Mbps Wi-Fi with Mesh Router',
      'Swimming Pool & Fitness Gym Access',
      'Sky Lounge Study Area with Aircon & Power Outlets',
      'Inverter Air Conditioner',
      '24/7 Professional Lobby Security & Concierge',
      'Convenience Store & BDO ATM on Ground Floor'
    ],
    roommateOpenings: [
      {
        name: 'Joshua Alcantara',
        major: 'BS Architecture (3rd Year, TIP-QC)',
        sleepHabit: 'Night Owl (working on design plates)',
        cleanliness: 'Clean & Organized',
        bio: 'Looking for a roommate who needs a high-end, quiet space for architecture drafting or capstone projects.'
      }
    ],
    description: 'Premium student condo-share for TIP QC students who value security, fitness amenities, and clean air. Only 1 bedspace slot left in this corner unit.',
    landlord: {
      name: 'Atty. Victor Cruz (Unit Owner)',
      phone: '+63 920 987 6543',
      responseRate: 'Within 15 mins',
      rating: 4.9,
      reviewsCount: 31
    }
  }
];

export const STUDENT_CHECKLIST_ITEMS = [
  {
    category: 'Meralco & Hidden Utility Rates (Critical in QC)',
    items: [
      'Check the submeter: Is it an official calibrated Meralco submeter with unbroken seal?',
      'Ask the landlord for the exact submeter rate per kWh (Standard Meralco residential rate is ₱12–₱14/kWh; avoid places charging predatory ₱20–₱25/kWh!).',
      'Confirm Manila Water billing: Is it based on a submeter, or split equally among tenants?',
      'Inquire if there is a monthly surcharge for charging heavy laptops or bringing an electric kettle.'
    ]
  },
  {
    category: 'Bedspace Inspection & Personal Space',
    items: [
      'Test the bed frame: Is the double-deck steel frame sturdy, squeak-free, and anchored securely?',
      'Verify power outlet access: Is there a dedicated socket near your specific bunk, or will you need an extension cord?',
      'Inspect lockable storage: Does your bedspace come with an individual steel locker or cabinet with padlock hasp?',
      'Check mattress condition and ask if the mattress is included or if you need to bring your own foam.'
    ]
  },
  {
    category: 'TIP QC Proximity & Daily Commute',
    items: [
      'Walk from the dorm to your designated TIP gate (Gate 1 Aurora, Gate 2 Anonas, or Gate 3 20th Ave) during morning rush hour (7:00 AM) to test real travel time.',
      'Check street lighting along the street at night (especially along Anonas and Project 4 side streets).',
      'Verify flood history: Is the ground floor or street flood-free during typhoon monsoon rains?'
    ]
  },
  {
    category: 'Study Needs & Internet Reliability',
    items: [
      'Run a speed test (Speedtest.net) inside the bedroom during evening peak hours (7 PM - 10 PM).',
      'Check mobile data signal (Smart / Globe / DITO) with the bedroom door shut.',
      'Confirm curfew policy: Can you enter after 10 PM if you have late-night thesis or laboratory classes in TIP?'
    ]
  },
  {
    category: 'Security Deposit & Contract Terms',
    items: [
      'Get a written receipt and signed contract stating when the 1-month security deposit will be returned after vacating.',
      'Take photos and 4K video of all existing wall scuffs, sockets, and tiles on Day 1 to guarantee full deposit refund.',
      'Confirm semester break policy: Can you suspend lease or get a discount during the summer break if not taking classes?'
    ]
  }
];

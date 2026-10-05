/**
 * Formats amount in Philippine Peso (PHP - ₱)
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₱0';
  return '₱' + Math.round(amount).toLocaleString('en-PH');
}

/**
 * Calculates the TRUE monthly cost of a dorm in PHP including all student living expenses around TIP QC
 */
export function calculateTrueCost(dorm, roommates = 1) {
  const p = dorm.pricing;
  const transitCost = dorm.distanceCampus.monthlyTransitCost || 0;
  
  // Total bills in PHP
  const baseRentPerPerson = p.baseRent / roommates;
  const electricityPerPerson = p.electricityEstimate / (roommates > 1 ? roommates * 0.8 : 1);
  const waterPerPerson = p.waterEstimate / (roommates > 1 ? roommates * 0.9 : 1);
  const wifiPerPerson = p.wifiFee / roommates;
  const laundry = p.laundryFeeEstimate;
  const hoa = (p.hoaDues || 0) / roommates;

  const totalMonthly = Math.round(
    baseRentPerPerson + electricityPerPerson + waterPerPerson + wifiPerPerson + laundry + hoa + transitCost
  );

  const hiddenCostDifference = totalMonthly - Math.round(baseRentPerPerson);

  return {
    baseRentPerPerson: Math.round(baseRentPerPerson),
    electricityPerPerson: Math.round(electricityPerPerson),
    waterPerPerson: Math.round(waterPerPerson),
    wifiPerPerson: Math.round(wifiPerPerson),
    laundry: Math.round(laundry),
    hoa: Math.round(hoa),
    transitCost,
    totalMonthly,
    hiddenCostDifference
  };
}

/**
 * Calculates the exact cash needed on day 1 to move in (in PHP)
 */
export function calculateMoveInCash(dorm, roommates = 1) {
  const p = dorm.pricing;
  const baseRentPerPerson = p.baseRent / roommates;
  const depositCash = baseRentPerPerson * (p.depositMonths || 1);
  const advanceCash = baseRentPerPerson * (p.advanceMonths || 1);
  const utilityBond = 1000; // typical ₱1,000 student submeter deposit in QC

  return {
    depositCash: Math.round(depositCash),
    advanceCash: Math.round(advanceCash),
    utilityBond,
    totalCashNeeded: Math.round(depositCash + advanceCash + utilityBond)
  };
}

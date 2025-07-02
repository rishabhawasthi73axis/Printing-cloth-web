
/**
 * Formats a number as Indian Rupees (INR)
 * @param amount - The amount to format
 * @returns Formatted string with ₹ symbol
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Converts a price from USD to INR (approximate conversion)
 * @param usdAmount - Amount in USD
 * @returns Converted amount in INR
 */
export const convertUSDtoINR = (usdAmount: number): number => {
  // Using a fixed conversion rate for consistent pricing
  const conversionRate = 83;
  return Math.round(usdAmount * conversionRate);
};

/**
 * Ensure all product prices are in INR
 * @param price - Price to check
 * @returns Price in INR format
 */
export const ensurePriceInINR = (price: number): number => {
  // If price is less than 100, it's likely in USD and needs conversion
  // This ensures that already converted prices don't get double converted
  if (price < 100) {
    return convertUSDtoINR(price);
  }
  return price;
};
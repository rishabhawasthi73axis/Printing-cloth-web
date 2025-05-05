
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
    // Using a fixed conversion rate (should be updated regularly in production)
    const conversionRate = 83;
    return Math.round(usdAmount * conversionRate);
  };
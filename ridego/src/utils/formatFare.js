/**
 * Format a number as Indian Rupee string
 * e.g. 1816 → '₹1,816'
 */
export const formatFare = (amount) => {
  if (!amount && amount !== 0) return '₹--';
  return '₹' + Number(amount).toLocaleString('en-IN');
};

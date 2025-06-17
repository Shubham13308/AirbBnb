export const formatDate = (date, onlyMonth) => {
  const options = {
    year: 'numeric',
    month: 'long',
  };
  if (!onlyMonth) {
    options.day = 'numeric';
  }

  const parsedDate = new Date(date);
  if (isNaN(parsedDate)) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', options).format(parsedDate);
};


export const formatCurrency = (amount) => {
  const value = amount || 0;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export function formatQuantity(quantity, noun) {
  return quantity === 1 ? `${quantity} ${noun}` : `${quantity} ${noun}s`;
}

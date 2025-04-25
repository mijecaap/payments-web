export const formatBalance = (balance: string | number) => {
  const numericBalance = typeof balance === 'string' ? parseFloat(balance) : balance;
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(numericBalance);
};

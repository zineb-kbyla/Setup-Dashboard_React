export const isDateExpired = (endDate) => {
  const today = new Date();
  const expiry = new Date(endDate);
  return expiry < today;
}; 
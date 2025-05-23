export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return isNaN(date) ? dateString : date.toLocaleString();
  } catch {
    return dateString;
  }
}; 
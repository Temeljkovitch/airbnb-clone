export const getTotalDays = (checkIn, checkOut) => {
  const date1 = new Date(checkIn);
  const date2 = new Date(checkOut);
  const totalDays = (date2 - date1) / (1000 * 3600 * 24);
  return totalDays;
};

export const getTomorrowDate = (date) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split("T")[0];
};

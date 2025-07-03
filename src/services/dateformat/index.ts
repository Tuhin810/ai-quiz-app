export const formatToReadableDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const day = date.getDate(); // 1-31
  const month = date.toLocaleString("default", { month: "long" }); // July
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

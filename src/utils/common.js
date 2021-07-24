export const capitalizeString = (str) => {
  if (!str) return "";
  return `${str[0].toUpperCase()}${str.slice(1)}`;
};

export const getMarkColor = (mark) => {
  if (mark >= 8) return "green";
  if (mark >= 4) return "goldenrod";
  return "red";
};

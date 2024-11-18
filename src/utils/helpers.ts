export const formattedDate = (date: Date) => {
  return new Date(date).toISOString();
};

export const desformatearFecha = (isoDate: Date | string) => {
  const date = new Date(isoDate);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

export const dateConverter = (input: string | number): string | number => {
  const toDateMilliseconds = (date: string): number => {
    const [month, day, year] = date.split("/").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }

    return parsedDate.getTime();
  };

  const toFormattedDate = (milliseconds: number): string => {
    const date = new Date(milliseconds);
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  if (typeof input === "string") {
    return toDateMilliseconds(input);
  } else if (typeof input === "number") {
    return toFormattedDate(input);
  } else {
    throw new Error("Invalid input type");
  }
};

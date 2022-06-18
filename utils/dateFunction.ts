import { formatDistanceToNow } from "date-fns";

export const getFormatDistanceToNow = (date: number) => {
  const fromNow = formatDistanceToNow(date);

  return fromNow;
};

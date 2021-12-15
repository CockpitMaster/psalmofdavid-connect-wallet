import { getUnixTime } from "date-fns";

export const unixTimeAfter = (seconds = 0) => {
  return getUnixTime(new Date()) + seconds;
};

import { useState, useEffect } from "react";

const DATE_UNITS = [
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
  ["second", 1],
];

const getDateDiffs = (timeStamp) => {
  const now = Date.now();
  const elpased = (timeStamp - now) / 1000;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elpased) > secondsInUnit || unit === "second") {
      const value = Math.floor(elpased / secondsInUnit);
      return { value, unit };
    }
  }
};

export default function useTimeAgo(timeStamp) {
  const [timeAgo, setTimeAgo] = useState(() => getDateDiffs(timeStamp));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timeStamp);
      setTimeAgo(newTimeAgo);
    }, 5000);
    return () => clearInterval(interval);
  }, [timeStamp]);

  const rtf = new Intl.RelativeTimeFormat("es", { style: "short" });
  const { value, unit } = timeAgo;

  return rtf.format(value, unit);
}

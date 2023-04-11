export default function countDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const timeDiff = end.getTime() - start.getTime();

  const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  return dayDiff;
}

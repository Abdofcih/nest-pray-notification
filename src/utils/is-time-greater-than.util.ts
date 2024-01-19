export const isTimeGreaterThan = (
  prayerTime: string,
  currentTimeInCairo: string,
): boolean => {
  const [hours, minutes] = prayerTime.split(':');
  const prayerDateTime = new Date();
  prayerDateTime.setHours(parseInt(hours, 10));
  prayerDateTime.setMinutes(parseInt(minutes, 10) + 15);
  console.log(`prayerDateTime : ${prayerDateTime}`);
  console.log(`currentTimeInCairo : ${new Date(currentTimeInCairo)}`);

  return new Date(currentTimeInCairo) > prayerDateTime;
};

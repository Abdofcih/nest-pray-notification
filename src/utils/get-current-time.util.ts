export const getCurrentTimeInCairo = () => {
  const currentUTCDate = new Date();
  const options = { timeZone: 'Africa/Cairo' };

  // Use toLocaleTimeString to extract time
  const currentTimeInCairo = currentUTCDate.toLocaleString('en-US', options);

  return currentTimeInCairo;
};

export const getCurrentDateInCairo = () => {
  const options = { timeZone: 'Africa/Cairo' };
  const dateString = new Date().toLocaleDateString('en-US', options);
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const [month, day, year] = parts;
    return `${day}-${month}-${year}`;
  }
  // Return the original string if the format is unexpected
  return dateString;
};

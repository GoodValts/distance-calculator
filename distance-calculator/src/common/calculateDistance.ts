const calculateDistance = (kmh: number, seconds: number, isMetric: boolean) => {
  const secondsInHour = 3600;
  const metersInKilometer = 1000;
  const metersInMile = 1609.344;

  const ratio = isMetric
    ? secondsInHour / metersInKilometer
    : secondsInHour / metersInMile;

  const result = (kmh / ratio) * seconds;

  if (result >= 50) return result.toFixed(0);
  if (result >= 10) return result.toFixed(1);
  return result.toFixed(2);
};

export default calculateDistance;

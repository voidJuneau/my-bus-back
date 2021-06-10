module.exports = timeStr => {
  const d = new Date();
  const [hours, minutes, seconds] = timeStr.split(':');
  d.setHours(hours);
  d.setMinutes(minutes);
  d.setSeconds(seconds);
  return d;
}
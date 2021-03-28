const CustomError = require("../extensions/custom-error");
const months = [
  [2, 3, 4],
  [5, 6, 7],
  [8, 9, 10],
  [11, 0, 1],
];
const seasons = ["spring", "summer", "autumn", "winter"];
module.exports = function getSeason(date) {
  let season = "";
  if (!date) {
    return "Unable to determine the time of year!";
  }
  if(! date || isNaN(date) || !date instanceof Date) {
    throw new Error()
  }
  const monthNumber = date.getMonth();
  let idx = 0;
  for(let i = 0; i < months.length; i++) {
    if(months[i].includes(monthNumber)) {
      idx = i;
      season = seasons[idx];
    }
  }
  return season;
};

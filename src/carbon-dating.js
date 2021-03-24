const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY= 15; 
const HALF_LIFE_PERIOD= 5730;
const LN2 = 0.693;

module.exports = function dateSample(sampleActivity) {
  if(typeof sampleActivity !== "string") return false;
  if(isNaN(Number.parseInt(sampleActivity)) || !Number.parseInt(sampleActivity)) return false;
  const numerator = Math.log(MODERN_ACTIVITY / sampleActivity);
  const denominator = LN2 / HALF_LIFE_PERIOD;
  const age = numerator / denominator
  return age > 0 ? Math.ceil(age) : false;
};

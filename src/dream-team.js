const CustomError = require("../extensions/custom-error");

module.exports = function createDreamTeam(members) {
  if (!Array.isArray(members)) return false;
  const onlyNames = members.filter(member => typeof member === "string");
  const initials = onlyNames.map(name => name.trim().toUpperCase().charAt(0))
  const res = initials.sort(function(a, b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
  }).join("")
  return res
};

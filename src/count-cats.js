const CustomError = require("../extensions/custom-error");

module.exports = function countCats(backyard) {
  let count = 0;
  backyard.forEach(el => {
    el.forEach(it => {
      if(it === "^^") {
        count++;
      }
    })
  })
  return count
};

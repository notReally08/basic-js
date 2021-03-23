const CustomError = require("../extensions/custom-error");

module.exports = function countCats(backyard) {
  let cats = [];
  backyard.forEach(innerArr => {
    const arr = innerArr.filter(item => item === '^^');
    cats = [...cats, ...arr];
  })
  return cats.length;
};

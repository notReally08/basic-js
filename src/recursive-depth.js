const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  constructor() {
    this.depth = 1;
  }
  calculateDepth(arr, depth = 1) {
    if(depth === 1) {
      this.depth = 1
    };
    arr.forEach((elem, i) => {
      if(elem instanceof Array) {
        let localDepth = depth + 1;
        this.calculateDepth(elem, localDepth)
        this.depth = localDepth > this.depth ? localDepth : this.depth
      }
    })
    return this.depth;
  }
};
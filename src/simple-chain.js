const CustomError = require("../extensions/custom-error");

const chainMaker = {
  chain: [],
  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain = [...this.chain, value]
    return this;
  },
  removeLink(position) {
    if(isNaN(position) || this.chain[position] === "undefined" || position < 0){
      this.chain = []
      throw Error
    } 
    this.chain = this.chain.filter((item, i) => i !== position - 1);
    return this;
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    let str = ""
    this.chain.forEach((item, i) => {
      str += item === " " ? `~~(${item})` : `~~( ${item} )`;
    })
    this.chain = []
    return str.substring(2);
  }
};

module.exports = chainMaker;

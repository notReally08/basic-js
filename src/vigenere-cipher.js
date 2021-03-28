const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(direct = true) {
    this.type = direct ? "direct" : "reverse";
    this.alphabet = this.initAlphabet();
    this.module = this.alphabet.length;
    this.keyStr = "";
    this.keyArr = [];
    this.initialPhraseStr = "";
    this.initialPhraseArr = "";
    this.latinPhrase = [];
    this.generatedKey = [];
    this.generatedKeyNumeric = [];
    this.generatedPhraseNumeric = [];
  }
  initAlphabet() {
    return ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  }
  initBase(initialPhrase, key) {
    this.keyStr = key.toUpperCase();
    this.keyArr = this.keyStr.split("");
    this.initialPhraseStr = initialPhrase.toUpperCase();
    this.initialPhraseArr = this.initialPhraseStr.split("");
    this.setLatinPhrase();
    this.generatedKey = this.generateKey();
    this.generateKeyNumeric();
    // console.log("generatedKeyNumeric", this.generatedKeyNumeric)
    // console.log("generatedPhraseNumeric", this.generatedPhraseNumeric)
  }
  setLatinPhrase() {
    this.latinPhrase = this.initialPhraseArr.filter(letter => this.alphabet.includes(letter))
  }
  extendKey() {
    const copyLength = this.latinPhrase.length - this.keyStr.length;
    const copyPart = this.keyStr.substr(0, copyLength);
    this.keyStr = this.keyStr += copyPart;
    if(this.keyStr.length < this.latinPhrase.length) {
      return this.extendKey();
    }
    return this.keyStr.split("");
  }
  shortenKey() {
    const initPhraseLength = this.latinPhrase.length;
    this.keyArr = this.keyStr.slice(0, initPhraseLength).split("");
    return this.keyArr;
  }
  generateKey() {
    const keyStrLength = this.keyStr.length;
    const initialPhraseLength = this.initialPhraseStr.length;
    if(keyStrLength > initialPhraseLength) {
      return this.shortenKey()
    } else if(keyStrLength < initialPhraseLength) {
      return this.extendKey();
    }
    return this.keyArr;
  }
  generateKeyNumeric() {
    this.generatedKeyNumeric = this.generatedKey.map(letter => this.alphabet.indexOf(letter));
    this.generatedPhraseNumeric = this.latinPhrase.map(letter => this.alphabet.indexOf(letter));
  }
  encrypt(initialPhrase, key) {
    if(!initialPhrase || !key) throw Error
    this.initBase(initialPhrase, key);
    const encryptedPhraseLatin = this.generatedPhraseNumeric.map((number, i) => {
      const sum = number + this.generatedKeyNumeric[i];
      if(sum >= this.module) {
        return this.alphabet[sum - this.module];
      }
      return this.alphabet[sum];
    })
    let count = 0;
    const encryptedSipher = this.initialPhraseArr.map(letter => {
      if(!this.alphabet.includes(letter)) {
        return letter;
      }
      count++;
      return encryptedPhraseLatin[count - 1];
    })
    // console.log(encryptedSipher)
    return this.type === "direct" ? encryptedSipher.join("") : encryptedSipher.reverse().join("");
  }    
  decrypt(sipher, key) {
    if(!sipher || !key) throw Error
    this.initBase(sipher, key);
    const decryptedPhraseLatin = this.generatedPhraseNumeric.map((number, i) => {
      const residual = number - this.generatedKeyNumeric[i];
      if(residual < 0) {
        return this.alphabet[number + this.module - this.generatedKeyNumeric[i]];
      }
      return this.alphabet[residual];
    })
    let count = 0;
    const decryptedPhrase = this.initialPhraseArr.map(letter => {
      if(!this.alphabet.includes(letter)) {
        return letter;
      }
      count++;
      return decryptedPhraseLatin[count - 1];
    })
    return this.type === "direct" ? decryptedPhrase.join("") : decryptedPhrase.reverse().join("");
  }
}

module.exports = VigenereCipheringMachine;

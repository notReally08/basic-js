const CustomError = require("../extensions/custom-error");

let res = undefined;
module.exports = function transform(arr) {
  const discardNext = (arr, toDiscard) => {
    if(toDiscard < 0 && toDiscard === arr.length - 1) return arr;
    arr.splice(toDiscard, 1, null)
    return newArr;
  };
  const discardPrev = (arr, toDiscard) => {
    if(!toDiscard) return arr;
    arr.splice(toDiscard - 1, 1, null)
    return newArr;
  };
  const doubleNext = (arr, toDouble) => {
    if(toDouble < 0 && toDouble === arr.length - 1) return arr;
    arr.splice(toDouble, 0, arr[toDouble])
    return newArr;
  };
  const doublePrev = (arr, toDouble) => {
    if(!toDouble) return arr;
    arr.splice(toDouble, 0, arr[toDouble - 1])
    return newArr;
  };
  const markers = [
    "--discard-next", 
    "--discard-prev",
    "--double-next",
    "--double-prev"
  ];
  const obj = {
    0: discardNext,
    1: discardPrev,
    2: doubleNext,
    3: doublePrev
  }
  let indexOfMarkerInArr = -1;
  let indexOfMarkerInObj = -1;
  if(!arr instanceof Array) throw new Error();
  if(!arr.length) return [];
  let newArr = [...arr];
  let end = false;
  for(let i = 0; i < newArr.length; i++) {
    if(markers.includes(newArr[i])) {
      indexOfMarkerInArr = i;
      indexOfMarkerInObj = markers.indexOf(newArr[i]);
      newArr.splice(indexOfMarkerInArr, 1)
      break;
    }
  }
  if(indexOfMarkerInObj >= 0) {
    res = obj[indexOfMarkerInObj](newArr, indexOfMarkerInArr);
  } else {
    res = newArr;
    end = true 
  }
  return end ? res.filter(el => el!==null && typeof el !== "undefined") : transform(res);
};

export function getRandomNum(min, max) {
  return min + Math.round(Math.random() * (max - min));
}

export function getShuffleIndexList(start = 0, end = 10) {
  let list = [];
  if (start >= end) {
    return [];
  }
  for (let i = start; i <= end; i++) {
    list.push(i);
  }

  // shuffle
  let result = [];
  while (list.length) {
    let index = getRandomNum(0, list.length - 1)
    const temp = list.splice(0, index)
    result.push(list.shift());
    list = temp.concat(list);
  }

  return result;
}


export function getRandomListItems(list, need) {
  if (!(list instanceof Array)) {
    return list;
  }
  if (need === undefined) {
    need = list.length;
  }
  if (list.length < need) {
    return list;
  }
  let shuffle = getShuffleIndexList(0, need - 1);


  let result = [];
  for (let i = 0; i < shuffle.length; i++) {
    result.push(list[shuffle[i]]);
  }

  return result;
}

export function getItemColumnList(list, column) {
  return list.reduce((o, v) => v[column],[])
}

// 获取目标字符串所有的索引位置
export function getStringIndex(string, target) {
  if (!string) {
    return -1;
  }
  let index = [];
  let substring = string;
  let begin = substring.indexOf(target);
  while (begin > -1) {
    index.push(begin);
    substring = substring.substring(begin + target.length);
    begin = substring.indexOf(target);
  }
  return index;
}

// 删除指定位置的目标字符串
export function deleteStringIndex(string, target, index = 0) {
  if (index > -1) {
    // 先获取所有
    let allIndex = getStringIndex(string, target);
    if (allIndex > -1) {
      let targetIndexStart = allIndex[index];
      let targetIndexEnd = targetIndexStart + target.length;
      return (
        string.substring(0, targetIndexStart) + string.substring(targetIndexEnd)
      );
    } else {
      return string;
    }
  }
  return string;
}

function getValueLabels(list, parentValue = "", parentLabel = "", resule = {}) {
  if (list) {
    list.forEach(el => {
      let { items, name, title } = el;
      let nextName = parentValue ? parentValue + "/" + name : name;
      let nextLabel = parentLabel ? parentLabel + "/" + title : title;

      if (items) {
        getValueLabels(items, nextName, nextLabel, resule);
      } else {
        resule[`@${nextName}`] = nextLabel;
      }
    });
  }
}
// value 转 label 数组
export function transationLabel(valueString, list) {
  //   console.log(valueString);
  let config = {};
  getValueLabels(list, "", "", config);
  // 先取出所有的value
  let reg = /(@=?)+(\S*)(?= )?/gi;
  let result = valueString.match(reg);
  if (result.length) {
    // 拿到所有匹配的
    // 先去重
    result = [...new Set(result)];
    // 然后去找label
    result.forEach(element => {
      let v = config[element] || "";
      valueString = valueString.replaceAll(element, "@" + v);
    });
  }
  return valueString;
}

function getValueLabels(
  list,
  parentValue = "",
  parentLabel = "",
  resule = {},
  startChart
) {
  if (list) {
    list.forEach(el => {
      let { items, name, title } = el;
      let nextName = parentValue ? parentValue + "/" + name : name;
      let nextLabel = parentLabel ? parentLabel + "/" + title : title;

      if (items) {
        getValueLabels(items, nextName, nextLabel, resule, startChart);
      } else {
        resule[`${startChart}${nextName}`] = nextLabel;
        resule[`${startChart}${nextLabel}`] = nextName;
      }
    });
  }
}
// value 转 label 数组
export function transationLabel(valueString, list, startChart, endChart) {
  // 先取出所有的value
  let reg = new RegExp(`(${startChart}=?)+(\\S*)(?=${endChart})?`, "g"); // /(@=?)+(\S*)(?= )?/gi;
  let result = valueString.match(reg);
  if (result && result.length) {
    let config = {};
    getValueLabels(list, "", "", config, startChart);
    // 拿到所有匹配的
    // 先去重
    result = [...new Set(result)];
    // 然后去找label
    result.forEach(element => {
      let v = config[element] || element;
      valueString = valueString.replaceAll(element, startChart + v);
    });
  }
  return valueString;
}

// value 转 label 数组
export function transationValue(labelString, list, startChart, endChart) {
  // 先取出所有的value
  let reg = new RegExp(`(${startChart}=?)+(\\S*)(?=${endChart})?`, "g"); // /(@=?)+(\S*)(?= )?/gi;
  let result = labelString.match(reg);
  if (result && result.length) {
    let config = {};
    getValueLabels(list, "", "", config, startChart);
    // 拿到所有匹配的
    // 先去重
    result = [...new Set(result)];
    // 然后去找label
    result.forEach(element => {
      let v = config[element] || element;
      if (v != startChart) {
        labelString = labelString.replaceAll(element, startChart + v);
      }
    });
  }
  return labelString;
}

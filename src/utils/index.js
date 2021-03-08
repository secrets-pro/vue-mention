function getValueLabels(
  list,
  parentValue = "",
  parentLabel = "",
  resule = {},
  startChart,
  endChart
) {
  if (list) {
    list.forEach(el => {
      let { items, name, title } = el;
      let nextName = parentValue ? parentValue + "/" + name : name;
      let nextLabel = parentLabel ? parentLabel + "/" + title : title;

      if (items) {
        getValueLabels(
          items,
          nextName,
          nextLabel,
          resule,
          startChart,
          endChart
        );
      } else {
        resule[
          `${startChart}${nextName}${endChart}`
        ] = `${startChart}${nextLabel}${endChart}`;
        resule[
          `${startChart}${nextLabel}${endChart}`
        ] = `${startChart}${nextName}${endChart}`;
      }
    });
  }
}
// value 转 label 数组
export function transationLabel(valueString, list, startChart, endChart) {
  if (!valueString) {
    return "";
  }
  // 先取出所有的value
  let s = `[^\\${startChart}\\${endChart}]+(?=\\${endChart})`;
  let reg = new RegExp(s, "g"); // /(@=?)+(\S*)(?= )?/gi;
  let result = valueString.match(reg);
  if (result && result.length) {
    let config = {};
    getValueLabels(list, "", "", config, startChart, endChart);
    // 拿到所有匹配的
    // 先去重
    result = [...new Set(result)];
    // 然后去找label
    result.forEach(element => {
      let els = `${startChart}${element}${endChart}`;
      let v = config[els] || els;
      valueString = valueString.replaceAll(els, v);
    });
  }
  return valueString;
}

// value 转 label 数组
export function transationValue(labelString, list, startChart, endChart) {
  if (!labelString) {
    return "";
  }
  // 先取出所有的value
  let s = `[^\\${startChart}\\${endChart}]+(?=\\${endChart})`;
  let reg = new RegExp(s, "g"); // /(@=?)+(\S*)(?= )?/gi;
  let result = labelString.match(reg);
  if (result && result.length) {
    let config = {};
    getValueLabels(list, "", "", config, startChart, endChart);
    // 拿到所有匹配的
    // 先去重
    result = [...new Set(result)];
    // 然后去找label
    result.forEach(element => {
      let els = `${startChart}${element}${endChart}`;
      let v = config[els] || els;
      if (v != startChart) {
        labelString = labelString.replaceAll(els, v);
      }
    });
  }
  return labelString;
}

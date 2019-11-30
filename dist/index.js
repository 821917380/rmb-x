'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var numbers = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
var leftUnits = ['元', '拾', '佰', '仟', '万', '拾', '佰', '仟', '亿', '拾', '佰', '仟', '万', '拾', '佰', '仟', '万'];
var rightUnits = ['角', '分'];

var rmb = function rmb(value) {
  if (Object.prototype.toString.call(value) === '[object Number]' && value >= 0.01) {
    var fragment = [];

    var _String$split$map = String(value).split('.').map(function (part) {
      return part.split('').map(function (i) {
        return i * 1;
      });
    }),
        _String$split$map2 = _slicedToArray(_String$split$map, 2),
        leftValues = _String$split$map2[0],
        rightValues = _String$split$map2[1];

    var leftValueLength = leftValues.length; // 整数部分位数
    var unit1 = leftValueLength - 1; // 元位
    var unit5 = leftValueLength - 5; // 万位
    var unit9 = leftValueLength - 9; // 亿位
    var unit13 = leftValueLength - 13; // 万亿位
    var unit17 = leftValueLength - 17; // 万万亿位
    var hasLeftValue = leftValueLength > 1 || leftValues[0] > 0; // 整数部分不为0
    var hasRightValue = rightValues && (rightValues[0] > 0 || rightValues[1] > 0); // 小数部分不为0
    var has678Value = leftValues[unit5 - 1] > 0 || leftValues[unit5 - 2] > 0 || leftValues[unit5 - 3] > 0; // 拾万、佰万或仟万位不为0
    var overflowIndex = leftValueLength - leftUnits.length; // 溢出位索引

    var leftUnitIndex = 0;
    for (var i = leftValueLength - 1; i >= 0; i--) {
      if (leftValues[i] === 0 && (i === unit5 || i === unit9 || i === unit13 || i === unit17) && leftValues[i + 1] > 0) {
        // 当前位为0，且当前位为万、亿、万亿、万万亿，且低一位不为0
        fragment.unshift(numbers[leftValues[i]]);
      }

      if (leftValues[i] > 0 || i === unit1 && hasLeftValue || i === unit5 && has678Value || i === unit9 || i === unit13 || i === unit17) {
        // 元、万、亿、万亿、万万亿或当前位不为0
        fragment.unshift(leftUnits[leftUnitIndex]);
      }

      if (leftValues[i] > 0 || leftValues[i + 1] > 0 && i !== unit5 && i !== unit9 && i !== unit13 && i !== unit17 || i <= overflowIndex) {
        // 当前位不为0，或低一位不为0且当前位非万、亿、万亿、万万亿，或当前为溢出位
        fragment.unshift(numbers[leftValues[i]]);
      }

      leftUnitIndex++;
    }

    if (hasRightValue) {
      // 角
      if (rightValues[0] > 0 || hasLeftValue) {
        // 角位不为0，或整数位不为0
        fragment.push(numbers[rightValues[0]]);
      }
      if (rightValues[0] > 0) {
        // 角位不为0
        fragment.push(rightUnits[0]);
      }
      // 分
      if (rightValues[1] > 0) {
        fragment.push(numbers[rightValues[1]]);
        fragment.push(rightUnits[1]);
      }
    } else {
      // 没有小数位
      fragment.push('整');
    }
    return fragment.join('');
  }
  return '零元整';
};

module.exports = rmb;
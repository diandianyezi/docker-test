/**
 * @param {string} word
 * @return {number}
 */
var minTimeToType = function(word) {
    const arr = word.split('');
    let res = 0, pre = 'a';

    // 根据当前字符和下一字符 判断是顺时针还是逆时针走呢
    for(let i = 0; i < arr.length; i++) {
        // 移动的距离
        pre = i === 0 ? 'a' : arr[i-1];
        let tmp = Math.abs(pre.charCodeAt() - arr[i].charCodeAt());
        let dis = tmp > 13 ? (26 - tmp) : tmp;
        // console.info(arr[i], pre, preCode, curCode, dis)
        res = res + dis + 1;
    }
    return res;
};

console.info(minTimeToType('bza'))
console.info(minTimeToType('zjpc'))
console.info(minTimeToType('abc'))
console.info(minTimeToType('evbedrhwy'))
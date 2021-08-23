/**
 * @param {string} num
 * @return {number}
 */
 var numberOfCombinations = function(num) {
    var arr = num.split('')
    if (+arr[0] === 0)  {
        return 0
    }
    const res = solution([], num)
    return res % (Math.pow(10,9) + 7)
};

var solution = function(resArr, num) {
    if (num === '') return 0
    let resArrLocal = resArr.slice(0)
    let len = resArrLocal.length
    let numLen = num.length
    let lastItem = resArrLocal[len-1] || 0
    if (resArrLocal.length == 0) {
        start = 1
    } else  {
        if (compare(lastItem, num)) {
            return 0
        } else {
            if ((lastItem) === num) {
                return 1
            }
        }
        start = (lastItem + '').length
    }
    let count = 0
    for(let i = start; i <= numLen; i++) {
        const num1 = num.substr(0, i)
        const num2 = num.substr(i)
        if (num1.indexOf('0') === 0 || num2.indexOf('0') === 0) {
            continue
        }
        if (resArrLocal[len-1] && compare(lastItem,num1)) {
            continue
        }
        if (num2 === '') {
            if (!compare(lastItem, num1)) {
                resArrLocal.push(+num1)
                count++
                // console.info(resArrLocal)
            }
        }

        if (num1 && num2) {
            if (!compare(num1, num2)) {
                count += solution(resArrLocal.concat(num1), num2)
            } else {
                continue
            }
        }
    }
    return count
};

// num1 是否大于 num2
var compare = function(str1, str2) {
    if (!str1) return false
    if (!str2) return true
    // console.info('比较', str1, str2)
    if (str1.length === str2.length) {
        return str1 > str2
    } else {
        return str1.length > str2.length
    }
}
// console.info(numberOfCombinations('327'))
// console.info(numberOfCombinations('094'))
// console.info(numberOfCombinations('1203'))
console.info(numberOfCombinations("57366096569998808177038860868034764472649082771812982665702793714521117518689268602592222064474212309407778097339776719903849830220"))
// console.info(numberOfCombinations('488510272614933163735160917798270808697829221699586693465472269848583339452288515879968460'))
// console.info(numberOfCombinations('9999999999999'))
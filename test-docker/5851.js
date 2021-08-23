/**
 * @param {string[]} nums
 * @return {string}
 */
 var findDifferentBinaryString = function(nums) {
    var arr = nums.map(v => parseInt(v, 2))
    let len = nums.length
    for(let i = 0; i< Math.pow(2, 16)/2;i++) {
        if(!arr.includes(i)) {
            const str = i.toString(2)
            console.info(str)
            return getStr(len - str.length) + i.toString(2)
        } 
    }
    return getStr(len)
};

var  getStr = function (n) {
    return Array.from({length:n}, (v) => '0').join('');
}

console.info(findDifferentBinaryString(['011', '110', '000']))
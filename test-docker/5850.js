/**
 * @param {number[]} nums
 * @return {number}
 */
 var findGCD = function (nums) {
    let min = Number.MAX_SAFE_INTEGER, max = Number.MIN_SAFE_INTEGER;

    for(let i = 0; i<nums.length; i++) {
        if(nums[i] < min) min = nums[i]
        if(nums[i] > max) max = nums[i]
    }
    // 求俩数的最大公约数
    return getGCD(min, max)
};

// var getGCD = function (min, max) {
//     let res = 1
//     if (max % min === 0) {
//         return min
//     } else {
//         const f = Math.min(min, parseInt(max/2))
//         for(let i = 1; i <= f; i++) {
//             if (max % i === 0 && min % i === 0) {
//                 res = i
//             }
//         }
//     }
//     return res
// }

// 方法二
var getGCD = function (min, max) {
    if (max % min === 0) return min
    let f = 2
    while(f < min) {
        if (min % f === 0 && max % f === 0) {
            break
        } else {
            f++
        }
    }
    if (f === min) return 1
    return f * getGCD(min/f, max/f)
}
console.info(findGCD([10,8]))



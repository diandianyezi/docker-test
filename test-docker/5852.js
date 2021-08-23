/**
 * @param {number[][]} mat
 * @param {number} target
 * @return {number}
 */
var minimizeTheDifference = function(mat, target) {
    let min = Number.MAX_SAFE_INTEGER
    let len = mat.length


    for(let i = 0; i < len; i++) { // 每一行选一个
        for(let j = 0; j < len; j++) {
            for(let k = 0; k < len; k++) {
                let sum = mat[0][i] + +mat[1][j] + mat[2][k]
                for(let ii= 0; ii < len; ii++) {
                    sum += mat[ii][]
                }
                // console.info(i, j , k, sum)
                if (Math.abs(sum-target) < min) {
                    min = Math.abs(sum-target)
                }
            }
        }
    }
    return min
};

// console.info(minimizeTheDifference([[1,2,3],[4,5,6],[7,8,9]], 13));
// console.info(minimizeTheDifference([[1],[2],[3]], 100));
console.info(minimizeTheDifference([[1,2,9,8,7]], 6));
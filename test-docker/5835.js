/**
 * @param {number[][]} matrix
 * @return {number}
 */
 var maxMatrixSum = function(matrix) {
    let count = 0, sum = 0, maxNum = Number.MAX_SAFE_INTEGER
    for(let i = 0; i< matrix[0].length; i++) {
        for(let j = 0; j < matrix[i].length; j++) {
            sum += Math.abs(matrix[i][j])
            matrix[i][j] < 0 && count++
            if (Math.abs(matrix[i][j]) < maxNum) {
                maxNum = Math.abs(matrix[i][j])
            }
        }
    }
    if (count % 2 === 0 ) {
        return sum
    } else {
        return sum - 2 * maxNum  
    }
};

console.info(maxMatrixSum([[1, -1],[-1,1]]))
console.info(maxMatrixSum([[1,2,3],[-1,-2,-3],[1,2,3]]))
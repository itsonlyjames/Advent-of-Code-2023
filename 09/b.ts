const lines = Deno.readTextFileSync('./input.txt').split(/\n/)

const calcDifferences = (nums: number[]) =>
    nums
        .map((num, i) => +nums[i - 1] - +num)
        .filter((num: number) => !isNaN(num))

let sum = 0
lines.forEach((line) => {
    let ri = 0
    const nums = line.split(' ').map((num) => +num)
    const differences = [nums]
    ri++
    differences[ri] = differences[ri] || []
    differences[ri].push(...calcDifferences(nums))
    while (differences[ri].every((num) => +num === 0) !== true) {
        ri++
        differences[ri] = differences[ri] || []
        differences[ri].push(...calcDifferences(differences[ri - 1]))
    }
    differences.forEach((diff) => (sum += diff[0]))
})
console.log('🚀', sum)

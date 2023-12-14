const input = Deno.readTextFileSync('./input.txt')
    .split(/\n/)
    .map((l) => l.split(''))

for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
        let row = r
        while (row !== 0) {
            const ch = input[row][c]
            const above = input[row - 1][c]
            if (above === '.' && ch == 'O') {
                input[row - 1][c] = ch
                input[row][c] = '.'
            }
            row--
        }
    }
}
console.log(input.map((el) => el.join('')).join('\n'))
let ans = 0
for (let i = 0; i < input.length; i++) {
    ans += input[i].filter((c) => c === 'O').length * (input.length - i)
}
console.log('🚀', ans)

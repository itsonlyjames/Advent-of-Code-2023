const input = Deno.readTextFileSync('./input.txt')
    .split(/\n\n/)
    .map((grid) => grid.split(/\n/).map((l) => l.split('')))

const transpose: (pattern: string[][]) => string[][] = (pattern) => {
    const res = Array(pattern[0].length).fill('')
    for (const r of pattern) [...r].forEach((c, i) => (res[i] += c))
    return res.map((l) => l.split(''))
}

const checkMirror = (pattern: string[][], row: number, part: number) => {
    let badness = 0
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
        const pi = pattern[i],
            pj = pattern[j]
        for (let k = 0; k < pi.length; k++) {
            if (pi[k] !== pj[k]) badness += 1
        }
    }
    if (badness == (part == 1 ? 0 : 1)) return true
}

for (const part of [1, 2]) {
    let count = 0
    input.forEach((grid) => {
        for (let i = 1; i < grid.length; i++) {
            if (checkMirror(grid, i, part)) count += 100 * i
        }
        const transposed = transpose(grid)
        for (let i = 1; i < transposed.length; i++) {
            if (checkMirror(transposed, i, part)) count += i
        }
    })
    console.log(`🚀 Part ${part}:`, count)
}

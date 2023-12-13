const input = Deno.readTextFileSync('./input.txt')
    .split(/\n\n/)
    .map((el) => el.split(/\n/))

const transpose: (pattern: string[]) => string[] = (pattern) => {
    const res = Array(pattern[0].length).fill('')
    for (const r of pattern) [...r].forEach((c, i) => (res[i] += c))
    return res
}

const checkMirror = (pattern: string[], row: number) => {
    for (let i = row - 1, j = row; i >= 0 && j < pattern.length; i--, j++) {
        if (pattern[i] !== pattern[j]) return false
    }
    return true
}

let count = 0
input.forEach((pattern) => {
    for (let i = 1; i < pattern.length; i++) {
        if (checkMirror(pattern, i)) count += 100 * i
    }
    const transposed = transpose(pattern)
    for (let i = 1; i < transposed.length; i++) {
        if (checkMirror(transposed, i)) count += i
    }
})
console.log('🚀', count)

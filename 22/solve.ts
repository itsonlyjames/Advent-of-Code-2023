const grid = Deno.readTextFileSync('./input.txt').split(/\n/)

const bricks = grid
    .map((el) =>
        el
            .replace('~', ',')
            .split(',')
            .map((i) => parseInt(i))
    )
    .sort((a, b) => a[2] - b[2])

const doesOverlap = (a: number[], b: number[]) =>
    Math.max(a[0], b[0]) <= Math.min(a[3], b[3]) &&
    Math.max(a[1], b[1]) <= Math.min(a[4], b[4])

for (const [index, brick] of bricks.entries()) {
    let mz = 1
    for (const check of bricks.slice(0, index)) {
        if (doesOverlap(brick, check)) {
            mz = Math.max(mz, check[5] + 1)
        }
    }
    brick[5] -= brick[2] - mz
    brick[2] = mz
}

bricks.sort((a, b) => a[2] - b[2])

const kSupportsV = Object.fromEntries(
    Array.from({ length: bricks.length }, (_) => new Set<number>()).entries()
)

const vSupportsK = Object.fromEntries(
    Array.from({ length: bricks.length }, (_) => new Set<number>()).entries()
)

for (const [j, upper] of bricks.entries()) {
    for (const [i, lower] of bricks.slice(0, j).entries()) {
        if (doesOverlap(lower, upper) && upper[2] === lower[5] + 1) {
            kSupportsV[i].add(j)
            vSupportsK[j].add(i)
        }
    }
}

const solve = (part: number) => {
    let total = 0
    for (const i of bricks.keys()) {
        if (part === 1) {
            if ([...kSupportsV[i]].every((j) => vSupportsK[j].size >= 2)) {
                total += 1
            }
            continue
        }

        const queue = [...kSupportsV[i]].filter((j) => vSupportsK[j].size === 1)
        const falling = new Set(queue)
        falling.add(i)

        while (queue.length) {
            const j = queue.shift()!
            for (const k of kSupportsV[j]) {
                if (falling.has(k)) continue
                if ([...vSupportsK[k]].every((l) => falling.has(l))) {
                    queue.push(k)
                    falling.add(k)
                }
            }
        }
        total += falling.size - 1
    }
    return total
}

console.log('🚀 part 1:', solve(1))
console.log('🚀 part 2:', solve(2))

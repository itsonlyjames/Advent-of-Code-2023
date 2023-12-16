const input = Deno.readTextFileSync('./input.txt')
    .split(/\n/)
    .map((l) => l.split(''))

interface Dirs {
    n: number[]
    s: number[]
    w: number[]
    e: number[]
}
const dirs: Dirs = { n: [-1, 0], s: [1, 0], w: [0, -1], e: [0, 1] }
const move = (
    seen: string[][],
    y: number,
    x: number,
    dir: keyof Dirs
): void => {
    if (y < 0 || y >= seen.length || x < 0 || x >= seen[0].length) return
    if (seen[y][x] === dir) return
    seen[y][x] = dir
    const c = input[y][x]
    if (c === '-') {
        if (dir === 'n' || dir === 's') {
            return move(seen, y, x - 1, 'w'), move(seen, y, x + 1, 'e')
        } else {
            return move(seen, y + dirs[dir][0], x + dirs[dir][1], dir)
        }
    }
    if (c === '|') {
        if (dir === 'e' || dir === 'w') {
            return move(seen, y - 1, x, 'n'), move(seen, y + 1, x, 's')
        } else {
            return move(seen, y + dirs[dir][0], x + dirs[dir][1], dir)
        }
    }
    if (c === '\\') {
        switch (dir) {
            case 'n':
                return move(seen, y, x - 1, 'w')
            case 's':
                return move(seen, y, x + 1, 'e')
            case 'e':
                return move(seen, y + 1, x, 's')
            case 'w':
                return move(seen, y - 1, x, 'n')
        }
    }
    if (c === '/') {
        switch (dir) {
            case 'n':
                return move(seen, y, x + 1, 'e')
            case 'e':
                return move(seen, y - 1, x, 'n')
            case 'w':
                return move(seen, y + 1, x, 's')
            case 's':
                return move(seen, y, x - 1, 'w')
        }
    }
    return move(seen, y + dirs[dir][0], x + dirs[dir][1], dir)
}

const initSeen = (arr: string[][]) =>
    Array(arr.length)
        .fill('')
        .map(() => Array(arr[0].length).fill(' '))

for (const part of [1, 2]) {
    let total = 0

    const cc = (y: number, x: number, d: keyof Dirs) => {
        const seen = initSeen(input)
        move(seen, y, x, d),
            (total = Math.max(
                total,
                seen.reduce(
                    (acc, row) => acc + row.filter((v) => v !== ' ').length,
                    0
                )
            ))
    }

    if (part == 1) {
        cc(0, 0, 'e')
    } else {
        for (let i = 0; i < input.length; i++) {
            cc(i, 0, 'e'), cc(i, input[0].length - 1, 'w')
        }
        for (let i = 0; i < input[0].length; i++) {
            cc(0, i, 's'), cc(input.length - 1, 0, 'n')
        }
    }
    console.log(`🚀 Part ${part}:`, total)
}

const input = Deno.readTextFileSync('./input.txt').split(/\n/)

interface Dirs {
    R: number[]
    D: number[]
    L: number[]
    U: number[]
    [key: string]: number[]
}

const dirs: Dirs = { R: [0, 1], D: [-1, 0], L: [0, -1], U: [1, 0] }
const solve = (part2: boolean) => {
    let pos = [0, 0]
    const grid = []
    let perimeter = 0
    for (const l of input) {
        let [d, n] = l.split(' ')
        if (part2) {
            const w: string = l.split('#')[1].split(')')[0]
            d = Object.keys(dirs)[parseInt(w.substring(w.length - 1))]
            n = parseInt(w.slice(0, -1), 16).toString()
        }
        const [y, x] = dirs[d]
        const dist = parseInt(n)
        pos = [pos[0] + dist * y, pos[1] + dist * x]
        perimeter += dist
        grid.push(pos)
    }

    let a = 0
    for (let i = 0; i < grid.length - 1; i++) {
        a += (grid[i][1] + grid[i + 1][1]) * (grid[i][0] - grid[i + 1][0])
    }

    return perimeter / 2 + a / 2 + 1
}

for (const p of [1, 2]) {
    console.log(`🚀 Part ${p}:`, solve(p === 1 ? false : true))
}

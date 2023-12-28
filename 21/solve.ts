const grid = Deno.readTextFileSync('./input.txt').split(/\n/)

const getStartingCoords = (grid: string[]): number[] | undefined => {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (grid[r][c] == 'S') {
                return [r, c]
            }
        }
    }
}

const fill = (sr: number, sc: number, ss: number) => {
    const ans = new Set()
    const seen = new Set(`${sr}:${sc}`)
    const q = [[sr, sc, ss]]

    while (q.length) {
        const [r, c, s] = q.shift() as [number, number, number]

        if (s % 2 == 0) {
            ans.add(`${r}:${c}`)
        }
        if (s == 0) {
            continue
        }

        for (const [nr, nc] of [
            [r + 1, c],
            [r - 1, c],
            [r, c + 1],
            [r, c - 1]
        ] as [number, number][]) {
            if (
                nr < 0 ||
                nr >= grid.length ||
                nc < 0 ||
                nc >= grid[0].length ||
                grid[nr][nc] == '#' ||
                seen.has(`${nr}:${nc}`)
            ) {
                continue
            }

            seen.add(`${nr}:${nc}`)
            q.push([nr, nc, s - 1])
        }
    }

    return ans.size
}

const [sr, sc] = getStartingCoords(grid) ?? [0, 0]

const size = grid.length
const steps = 26501365

const gridWidth = Math.floor(steps / size) - 1

const odd = Math.pow(Math.floor(gridWidth / 2) * 2 + 1, 2)
const even = Math.pow(Math.floor((gridWidth + 1) / 2) * 2, 2)

const oddPoints = fill(sr, sc, size * 2 + 1)
const evenPoints = fill(sr, sc, size * 2)

const cornerT = fill(size - 1, sc, size - 1)
const cornerR = fill(sr, 0, size - 1)
const cornerB = fill(0, sc, size - 1)
const cornerL = fill(sr, size - 1, size - 1)

const smallTR = fill(size - 1, 0, Math.floor(size / 2) - 1)
const smallTL = fill(size - 1, size - 1, Math.floor(size / 2) - 1)
const smallBR = fill(0, 0, Math.floor(size / 2) - 1)
const smallBL = fill(0, size - 1, Math.floor(size / 2) - 1)

const largeTR = fill(size - 1, 0, Math.floor((size * 3) / 2) - 1)
const largeTL = fill(size - 1, size - 1, Math.floor((size * 3) / 2) - 1)
const largeBR = fill(0, 0, Math.floor((size * 3) / 2) - 1)
const largeBL = fill(0, size - 1, Math.floor((size * 3) / 2) - 1)

const part2Ans =
    odd * oddPoints +
    even * evenPoints +
    cornerT +
    cornerR +
    cornerB +
    cornerL +
    (gridWidth + 1) * (smallTR + smallTL + smallBR + smallBL) +
    gridWidth * (largeTR + largeTL + largeBR + largeBL)

console.log('🚀 part 1:', fill(sr, sc, 64))
console.log('🚀 part 2:', part2Ans)

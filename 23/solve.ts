import { Point, Points } from './helpers.ts'
const grid = Deno.readTextFileSync('./input.txt')
    .split(/\n/)
    .map((e) => e.split(''))

const start: Point = [0, grid[0].indexOf('.')]
const end: Point = [grid.length - 1, grid[grid.length - 1].indexOf('.')]

const points = new Points([start, end])

for (const [r, row] of grid.entries()) {
    for (const [c, ch] of row.entries()) {
        if (ch == '#') continue
        let neighbours = 0
        for (const [nr, nc] of [
            [r - 1, c],
            [r + 1, c],
            [r, c - 1],
            [r, c + 1]
        ]) {
            if (
                0 <= nr &&
                nr < grid.length &&
                0 <= nc &&
                nc < grid[0].length &&
                grid[nr][nc] !== '#'
            ) {
                neighbours += 1
            }
        }
        if (neighbours >= 3) points.add([r, c])
    }
}

const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
]

const dirs: Record<string, number[][]> = {
    '^': [[-1, 0]],
    v: [[1, 0]],
    '<': [[0, -1]],
    '>': [[0, 1]],
    '.': deltas
}

const getGraph = (withSlopes: boolean) => {
    const graph = Object.fromEntries(
        [...points].map((p) => [p, {} as Record<string, number>])
    )

    for (const [sr, sc] of points) {
        const stack = [[0, sr, sc]]
        const seen = new Set(JSON.stringify([sr, sc]))

        while (stack.length) {
            const [n, r, c] = stack.shift()!
            if (n != 0 && points.has([r, c])) {
                if (JSON.stringify([sr, sc]) == JSON.stringify([r, c])) continue
                graph[[sr, sc].toString()][JSON.stringify([r, c])] = n
                continue
            }

            for (const [dr, dc] of withSlopes ? dirs[grid[r][c]] : deltas) {
                const nr = r + dr
                const nc = c + dc
                if (
                    0 <= nr &&
                    nr < grid.length &&
                    0 <= nc &&
                    nc < grid[0].length &&
                    grid[nr][nc] != '#' &&
                    !seen.has(JSON.stringify([nr, nc]))
                ) {
                    stack.push([n + 1, nr, nc])
                    seen.add(JSON.stringify([nr, nc]))
                }
            }
        }
    }

    return graph
}

const solve = (start: Point, withSlopes: boolean) => {
    const seen = new Points()
    const graph = getGraph(withSlopes)

    const dfs = (point: Point): number => {
        if (JSON.stringify(point) == JSON.stringify(end)) return 0

        let max = -Infinity

        seen.add(point)
        for (const nx in graph[point.toString()]) {
            const nxp = JSON.parse(nx)
            if (!seen.has(nxp))
                max = Math.max(max, dfs(nxp) + graph[point.toString()][nx])
        }
        seen.delete(point)
        return max
    }

    return dfs(start)
}

for (const p of [1, 2]) {
    console.log(`🚀 part ${p}:`, solve(start, p == 1 ? true : false))
}

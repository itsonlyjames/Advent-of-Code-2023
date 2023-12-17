const input = Deno.readTextFileSync('./input.txt')
    .split(/\n/)
    .map((l) => l.split('').map((n) => parseInt(n)))

type Queued = [
    heatLoss: number,
    row: number,
    column: number,
    deltaRow: number,
    deltaColumn: number,
    steps: number
]

function getMinimalHeatLoss(grid: number[][], uc: boolean) {
    const queue: Queued[] = [[0, 0, 0, 0, 0, 0]]
    const seen = new Set<string>()

    while (queue.length) {
        const [hl, r, c, dr, dc, n] = queue
            .sort(([prevCost], [nextCost]) => nextCost - prevCost)
            .pop()!

        if (
            r === grid.length - 1 &&
            c === grid[0].length - 1 &&
            (uc ? n >= 4 : true)
        ) {
            return hl
        }

        const key = [r, c, dr, dc, n].toString()
        if (seen.has(key)) continue
        seen.add(key)

        if (n < (uc ? 10 : 3) && [dr, dc].toString() !== '0,0') {
            const nr = r + dr
            const nc = c + dc
            if (0 <= nr && nr < grid.length && 0 <= nc && nc < grid[0].length) {
                queue.push([hl + grid[nr][nc], nr, nc, dr, dc, n + 1])
            }
        }

        if (uc ? n >= 4 || [dr, dc].toString() === '0,0' : true) {
            for (const [ndr, ndc] of [
                [0, 1],
                [1, 0],
                [0, -1],
                [-1, 0]
            ]) {
                if (
                    [ndr, ndc].toString() !== [dr, dc].toString() &&
                    [ndr, ndc].toString() !== [-dr, -dc].toString()
                ) {
                    const nr = r + ndr
                    const nc = c + ndc

                    if (
                        0 <= nr &&
                        nr < grid.length &&
                        0 <= nc &&
                        nc < grid[0].length
                    ) {
                        queue.push([hl + grid[nr][nc], nr, nc, ndr, ndc, 1])
                    }
                }
            }
        }
    }
}

for (const part of [1, 2]) {
    const ultraCrucible = part === 1 ? false : true
    console.log(`🚀 Part ${part}:`, getMinimalHeatLoss(input, ultraCrucible))
}

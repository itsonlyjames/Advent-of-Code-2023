const input = Deno.readTextFileSync('./input.txt')
    .split(/\n/)
    .map((l) => l.split(''))

const tiltMirror = (graph: string[][], dx: number, dy: number): string[][] => {
    for (
        let row: number = dx === 1 ? graph.length - 1 : 0;
        0 <= row && row < graph.length;
        row += dx != 0 ? -dx : 1
    ) {
        for (
            let col: number = dy === 1 ? graph[row].length - 1 : 0;
            0 <= col && col < graph[row].length;
            col += dy != 0 ? -dy : 1
        ) {
            if (graph[row][col] === 'O') {
                let [x, y] = [row, col]
                while (
                    0 <= x + dx &&
                    x + dx < graph.length &&
                    0 <= y + dy &&
                    y + dy < graph[x + dx].length &&
                    graph[x + dx][y + dy] === '.'
                ) {
                    x += dx
                    y += dy
                }
                graph[row][col] = '.'
                graph[x][y] = 'O'
            }
        }
    }
    return graph
}

const cycles = 1000000000
const ps: Map<string, number> = new Map<string, number>()
for (let sc = 0; sc < cycles; sc++) {
    const gs: string = input.map((line: string[]) => line.join('')).join('\n')
    if (ps.has(gs)) {
        const scl: number = sc - ps.get(gs)!
        const rsc: number = cycles - sc
        sc += Math.floor(rsc / scl) * scl
    }
    ps.set(gs, sc)
    tiltMirror(input, -1, 0)
    tiltMirror(input, 0, -1)
    tiltMirror(input, 1, 0)
    tiltMirror(input, 0, 1)
}

let ans = 0
for (let i = 0; i < input.length; i++) {
    ans += input[i].filter((c) => c === 'O').length * (input.length - i)
}
console.log('🚀', ans)

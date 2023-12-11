const input = Deno.readTextFileSync('./input.txt').split(/\n/)

interface Coordinate {
    x: number
    y: number
}

function transformCoordinate(
    c: Coordinate,
    doubleRows: number[],
    doubleCols: number[]
) {
    return {
        x: c.x + doubleCols.filter((i) => i < c.x).length,
        y: c.y + doubleRows.filter((i) => i < c.y).length
    }
}

function getPoints(input: string[]) {
    const points: Coordinate[] = []
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == '#') points.push({ x: x, y: y })
        }
    }
    return points
}

function buildPairs(cs: Coordinate[]) {
    const pairs: [Coordinate, Coordinate][] = []
    for (let i = 0; i < cs.length; i++) {
        for (let j = i + 1; j < cs.length; j++) {
            pairs.push([cs[i], cs[j]])
        }
    }
    return pairs
}

function manhattanDistance(a: Coordinate, b: Coordinate) {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

const doubleRows = input
    .map((v, i) => [v, i])
    .filter(([v, i]) => !(v as string).includes('#'))
    .map(([v, i]) => i as number)
const inputLengthArray = Array.from(Array(input.length).keys())
const doubleCols = Array.from(Array(input[0].length).keys()).filter((i) =>
    inputLengthArray.every((j) => input[j][i] == '.')
)
const points: Coordinate[] = getPoints(input).map((c) =>
    transformCoordinate(c, doubleRows, doubleCols)
)
console.log(
    '🚀',
    buildPairs(points)
        .map(([a, b]) => manhattanDistance(a, b))
        .reduce((a, b) => a + b, 0)
)

const lines = Deno.readTextFileSync('./input.txt').split(/\n/)

let start: { x: number; y: number } = { x: 0, y: 0 }
const isLoop: boolean[][] = []
lines.forEach((line, row) => {
    isLoop[row] = []
    if (line.split('').find((el) => el === 'S')) {
        start = { x: line.indexOf('S'), y: row }
    }
})

let x = start.x
let y = start.y
let dir
const below = lines[y + 1][x]
const above = lines[y - 1][x]
if (below === '|' || below === 'L' || below === 'J') {
    dir = 'S'
    y++
}
if (!dir) {
    if (above === '|' || above === 'F' || above === '7') {
        dir = 'N'
        y--
    } else {
        dir = 'E'
        x++
    }
}

const path = [start, { x, y }]
isLoop[start.y][start.x] = true
isLoop[y][x] = true
while (x !== start.x || y !== start.y) {
    let deltaX = 0
    let deltaY = 0
    switch (lines[y][x] + dir) {
        case '|S':
            deltaY = 1
            break
        case '|N':
            deltaY = -1
            break
        case '-E':
            deltaX = 1
            break
        case '-W':
            deltaX = -1
            break
        case 'LS':
            deltaX = 1
            break
        case 'LW':
            deltaY = -1
            break
        case 'JS':
            deltaX = -1
            break
        case 'JE':
            deltaY = -1
            break
        case '7N':
            deltaX = -1
            break
        case '7E':
            deltaY = 1
            break
        case 'FN':
            deltaX = 1
            break
        case 'FW':
            deltaY = 1
            break
    }
    if (deltaY === 1) {
        dir = 'S'
    } else if (deltaY === -1) {
        dir = 'N'
    } else if (deltaX === -1) {
        dir = 'W'
    } else {
        dir = 'E'
    }
    x += deltaX
    y += deltaY
    isLoop[y] = isLoop[y] || []
    isLoop[y][x] = true
    path.push({ x, y })
}

let count = 0
for (let yy = 0; yy < lines.length; yy++) {
    let crosses = 0
    const line = lines[yy]
    let corner = ''
    for (let xx = 0; xx < line.length; xx++) {
        if (isLoop[yy][xx]) {
            const current = lines[yy][xx]
            if (current === '|') {
                crosses++
            } else if (current !== '-') {
                if (corner) {
                    if (corner === 'L' && current === '7') {
                        crosses++
                    } else if (corner === 'F' && current === 'J') {
                        crosses++
                    }
                    corner = ''
                } else {
                    corner = current
                }
            }
        } else if (crosses % 2 === 1) {
            count++
        }
    }
}
console.log('🚀', count)

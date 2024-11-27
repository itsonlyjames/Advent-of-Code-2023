const lines = Deno.readTextFileSync('./input.txt').split('\n\n')

const seeds = lines[0]
    .split(': ')[1]
    .split(' ')
    .map((i) => parseInt(i, 10))

const maps = lines.slice(1).map((i) => {
    const split = i.split('\n')
    const copy = split.slice(1)
    return [split[0], copy.map((i) => i.split(' ').map((i) => parseInt(i, 10)))]
})

function getLocation(seed: number) {
    let current = seed
    for (let i = 0; i < maps.length; i++) {
        const currentMaps = maps[i][1]
        for (let j = 0; j < currentMaps.length; j++) {
            const currentMap = currentMaps[j]
            const lower = currentMap[1]
            const upper = +currentMap[1] + +currentMap[2]
            if (current >= +lower && current <= upper) {
                current = current - +lower + +currentMap[0]
                break
            }
        }
    }
    return current
}

let lowest = Number.POSITIVE_INFINITY
for (let j = 0; j < seeds.length; j++) {
    const res = getLocation(seeds[j])
    if (res < lowest) {
        lowest = res
    }
    console.log('round', j, lowest)
}

console.log('🚀', lowest)

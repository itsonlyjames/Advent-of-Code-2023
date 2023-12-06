const lines = Deno.readTextFileSync('./input.txt').split(/\n/)

const times: number[] = []
const distances: number[] = []
lines.forEach((line) => {
    const nums = [...line.matchAll(/\d+/g)]
    let combined = ''
    nums.forEach((num) => (combined = combined + parseInt(num[0])))
    if (line.startsWith('Time')) times.push(parseInt(combined))
    if (line.startsWith('Distance')) distances.push(parseInt(combined))
})

const count: number[] = []
times.forEach((time, dis) => {
    count[dis] = 0
    for (let i = 0; i < time; i++) {
        const score = (time - i) * i
        if (score > distances[dis]) count[dis] = count[dis] += 1
    }
})

const total = count.reduce((sum, curr) => sum * curr, 1)
console.log('🚀', total)

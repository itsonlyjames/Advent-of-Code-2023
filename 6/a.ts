const lines = Deno.readTextFileSync('./input.txt').split(/\n/)

const times: number[] = []
const distances: number[] = []
lines.forEach((line) => {
    const nums = [...line.matchAll(/\d+/g)]
    nums.forEach((num) => {
        const pnum = parseInt(num[0])
        if (!isNaN(pnum)) {
            if (line.startsWith('Time')) times.push(pnum)
            if (line.startsWith('Distance')) distances.push(pnum)
        }
    })
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

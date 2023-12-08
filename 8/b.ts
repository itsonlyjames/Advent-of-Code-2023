const lines = Deno.readTextFileSync('./input.txt').split(/\n\n/)

const [orders, steps] = lines
const order = orders.split('')
const positions: string[] = []

const directions = steps.split(/\n/).reduce((dirs, step) => {
    const [ins, lr] = step.split(' = ')
    const [L, R] = lr.replace('(', '').replace(')', '').split(', ')
    dirs.set(ins, { L, R })
    if (ins.endsWith('A')) positions.push(ins)
    return dirs
}, new Map())

let stepsTaken = 0
const reached: number[] = []
while (reached.length !== positions.length) {
    stepsTaken++
    const RL = order[(stepsTaken - 1) % order.length]

    for (let i = 0; i < positions.length; i++) {
        const nextPos = directions.get(positions[i])[RL]
        positions[i] = nextPos
        if (nextPos.endsWith('Z') && !reached.includes(stepsTaken)) {
            reached.push(stepsTaken)
        }
    }
}

const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b)
const lcm = (a: number, b: number) => (a * b) / gcd(a, b)
console.log('🚀', reached.reduce(lcm))

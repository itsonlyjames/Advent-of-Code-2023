const lines = Deno.readTextFileSync('./input.txt').split(/\n\n/)

const [orders, steps] = lines
const order = orders.split('')

const directions = steps.split(/\n/).reduce((dirs, step) => {
    const [ins, lr] = step.split(' = ')
    const [L, R] = lr.replace('(', '').replace(')', '').split(', ')
    dirs.set(ins, { L, R })
    return dirs
}, new Map())

let stepsTaken = 0
let position = 'AAA'
while (position !== 'ZZZ') {
    const RL = order[stepsTaken % order.length]
    const next = directions.get(position)[RL]
    position = next
    stepsTaken++
}
console.log('🚀', stepsTaken)

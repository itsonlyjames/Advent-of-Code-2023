const input = Deno.readTextFileSync('./input.txt').split(/\n/)

interface IModule {
    name: string
    type: string
    outputs: string[]
    memory: { [key: string]: string } | string
}

class Module implements IModule {
    name: string
    type: string
    outputs: string[]
    memory: { [key: string]: string } | string

    constructor(name: string, type: string, outputs: string[]) {
        this.type = type
        this.name = name
        this.outputs = outputs
        if (type == '%') {
            this.memory = 'off'
        } else {
            this.memory = {}
        }
    }
}

const modules: { [key: string]: IModule } = {}
let broadcast_targets: string[] = []

for (const line of input) {
    const [left, right] = line.split(' -> ')
    const outputs = right.split(', ')
    if (left == 'broadcaster') {
        broadcast_targets = outputs
    } else {
        const type = left[0]
        const name = left.substring(1)
        modules[name] = new Module(name, type, outputs)
    }
}

for (const [name, module] of Object.entries(modules)) {
    for (const output of module.outputs) {
        if (output in modules && modules[output].type == '&') {
            modules[output].memory[name] = 'lo'
        }
    }
}

const feed = Object.entries(modules)
    .filter(([_, module]) => module.outputs.includes('rx'))
    .map(([name]) => name)[0]

const cycle_lengths: { [key: string]: number } = {}
const seen = Object.fromEntries(
    Object.entries(modules)
        .filter(([_, module]) => module.outputs.includes(feed))
        .map(([name]) => [name, null])
)

const gcd = (a: number, b: number): number => (!b ? a : gcd(b, a % b))

const lcm = (a: number, b: number) => (a * b) / gcd(a, b)

const calculate = () => {
    presses += 1
    lo += 1
    deque = broadcast_targets.map((x) => ['broadcaster', x, 'lo'])

    while (deque) {
        if (deque.length == 0) break
        const [origin, target, pulse] = deque.shift() as [
            string,
            string,
            string
        ]

        if (pulse == 'lo') lo += 1
        else hi += 1

        if (!(target in modules)) continue

        const module = modules[target]

        if (module.name == feed && pulse == 'hi') {
            seen[origin]!++
            if (!(origin in cycle_lengths)) cycle_lengths[origin] = presses

            if (Object.values(seen).every((x) => x)) {
                for (const cl of Object.values(cycle_lengths) as number[]) {
                    P2 = lcm(P2, cl)
                }
                run = false
            }
        }

        if (module.type === '%') {
            if (pulse == 'lo') {
                if (module.memory == 'off') module.memory = 'on'
                else module.memory = 'off'
                const outgoing = module.memory == 'on' ? 'hi' : 'lo'
                for (const x of module.outputs) {
                    deque.push([module.name, x, outgoing])
                }
            }
        } else {
            module.memory[origin] = pulse
            const outgoing = Object.values(module.memory!).every(
                (x) => x == 'hi'
            )
                ? 'lo'
                : 'hi'
            for (const x of module.outputs) {
                deque.push([module.name, x, outgoing])
            }
        }
    }
}

let lo = 0,
    hi = 0
let deque: string[][] = []
let P2 = 1
let presses = 0
let run = true
const solve = (part: number) => {
    if (part == 1) {
        for (const _ of Array(1000)) {
            calculate()
        }
        return lo * hi
    }

    while (run) {
        calculate()
    }
    return P2
}

for (const part of [1, 2]) {
    console.log(`🚀 part ${part}:`, solve(part))
}

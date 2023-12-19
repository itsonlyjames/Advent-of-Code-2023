const input = Deno.readTextFileSync('./input.txt').split(/\n\n/)

const [workflow, ratings] = input

const workflows: {
    [key: string]: [[string, string, number, string][], string]
} = {}

interface Ratings {
    [key: string]: number
}

const ops: {
    [key: string]: (r: number, n: number) => boolean
} = {
    '<': (r, n) => r < n,
    '>': (r, n) => r > n
}

for (const line of workflow.split(/\n/)) {
    const [name, rest] = line.slice(0, -1).split('{')
    const rules = rest.split(',')
    workflows[name] = [[], rules.pop()!]
    for (const rule of rules) {
        const [comp, target] = rule.split(':')
        const key = comp[0]
        const op = comp[1]
        const n = parseInt(comp.slice(2))
        workflows[name][0].push([key, op, n, target])
    }
}

const accept = (ratings: Ratings, name = 'in'): boolean => {
    if (name === 'R') return false
    if (name === 'A') return true

    const [rules, fallback] = workflows[name]

    for (const [key, op, n, target] of rules as Array<
        [string, string, number, string]
    >) {
        if (ops[op](ratings[key], n)) return accept(ratings, target)
    }

    return accept(ratings, fallback)
}

const count = (ranges: { [key: string]: number[] }, name = 'in') => {
    if (name === 'R') return 0
    if (name === 'A') {
        let product = 1
        for (const [lo, hi] of Object.values(ranges)) {
            product *= hi - lo + 1
        }
        return product
    }

    const [rules, fallback] = workflows[name]

    let total = 0
    let fb = false
    for (const [key, op, n, target] of rules as Array<
        [string, string, number, string]
    >) {
        const [lo, hi] = ranges[key]
        let T, F
        if (op === '<') {
            T = [lo, n - 1]
            F = [n, hi]
        } else {
            T = [n + 1, hi]
            F = [lo, n]
        }
        if (T[0] <= T[1]) {
            const newRange = structuredClone(ranges)
            newRange[key] = T
            total += count(newRange, target)
        }
        if (F[0] <= F[1]) {
            ranges = structuredClone(ranges)
            ranges[key] = F
            fb = true
        }
    }

    if (fb) {
        total += count(ranges, fallback)
    }

    return total
}

const part2Range: {
    [key: string]: number[]
} = {}
for (const key of 'xmas') part2Range[key] = [1, 4000]

for (const part of [1, 2]) {
    if (part === 1) {
        let total = 0

        for (const line of ratings.split(/\n/)) {
            const [x, m, a, s] = line
                .replace('{', '')
                .replace('}', '')
                .split(',')
            const ratings: Ratings = {
                x: parseInt(x.split('=')[1]),
                m: parseInt(m.split('=')[1]),
                a: parseInt(a.split('=')[1]),
                s: parseInt(s.split('=')[1])
            }
            if (accept(ratings)) {
                total += Object.values(ratings).reduce((acc, el) => acc + el)
            }
        }
        console.log('🚀 part 1:', total)
    } else {
        console.log('🚀 part 2:', count(part2Range))
    }
}

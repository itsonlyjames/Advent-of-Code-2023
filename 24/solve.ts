import { init } from 'z3-solver'
const input = Deno.readTextFileSync('./input.txt')
    .split(/\n/)
    .map((line) =>
        line
            .replace('@', ',')
            .split(',')
            .map((n) => Number(n))
    )
// import fs from 'node:fs'
// const input = fs
//     .readFileSync('./input.txt', { encoding: 'utf8' })
//     .split(/\n/)
//     .map((line) =>
//         line
//             .replace('@', ',')
//             .split(',')
//             .map((n) => Number(n))
//     )

class Hailstone {
    sx: number
    sy: number
    sz: number
    vx: number
    vy: number
    vz: number
    a: number
    b: number
    c: number

    constructor(
        sx: number,
        sy: number,
        sz: number,
        vx: number,
        vy: number,
        vz: number
    ) {
        this.sx = sx
        this.sy = sy
        this.sz = sz
        this.vx = vx
        this.vy = vy
        this.vz = vz

        this.a = vy
        this.b = -vx
        this.c = vy * sx - vx * sy
    }

    toString() {
        return `Hailstone{a=${this.a}, b=${this.b}, c=${this.c}}`
    }
}

const hailstones: Hailstone[] = input.map((line) => {
    const [sx, sy, sz, vx, vy, vz] = line
    return new Hailstone(sx, sy, sz, vx, vy, vz)
})

const calcIntersections = () => {
    let intersections = 0
    for (let i = 0; i < hailstones.length; i++) {
        const hs1 = hailstones[i]
        for (let j = 0; j < i; j++) {
            const hs2 = hailstones[j]
            const a1 = hs1.a,
                b1 = hs1.b,
                c1 = hs1.c
            const a2 = hs2.a,
                b2 = hs2.b,
                c2 = hs2.c

            if (a1 * b2 === b1 * a2) {
                continue
            }

            const x = (c1 * b2 - c2 * b1) / (a1 * b2 - a2 * b1)
            const y = (c2 * a1 - c1 * a2) / (a1 * b2 - a2 * b1)

            if (
                200000000000000 <= x &&
                x <= 400000000000000 &&
                200000000000000 <= y &&
                y <= 400000000000000
            ) {
                if (
                    [hs1, hs2].every(
                        (hs) =>
                            (x - hs.sx) * hs.vx >= 0 && (y - hs.sy) * hs.vy >= 0
                    )
                ) {
                    intersections += 1
                }
            }
        }
    }
    return intersections
}

const getStartingSum = async () => {
    const { Context } = await init()
    const { Real, Solver } = Context('main')

    const x = Real.const('x')
    const y = Real.const('y')
    const z = Real.const('z')

    const vx = Real.const('vx')
    const vy = Real.const('vy')
    const vz = Real.const('vz')

    const solver = new Solver()

    for (const [index, h] of hailstones.slice(0, 3).entries()) {
        const t = Real.const(`t${index}`)

        solver.add(t.ge(0))
        solver.add(x.add(vx.mul(t)).eq(t.mul(h.vx).add(h.sx)))
        solver.add(y.add(vy.mul(t)).eq(t.mul(h.vy).add(h.sy)))
        solver.add(z.add(vz.mul(t)).eq(t.mul(h.vz).add(h.sz)))
    }

    await solver.check()

    const model = solver.model()

    return [model.eval(x), model.eval(y), model.eval(z)]
        .map(Number)
        .reduce((a, b) => a + b)
}

console.log(`🚀 part 1:`, calcIntersections())
;(async () => {
    console.log(`🚀 part 2:`, await getStartingSum())
})()

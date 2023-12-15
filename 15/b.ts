const input = Deno.readTextFileSync('./input.txt').split(',')

interface Map {
    label: string
    lens: number
}
const array = new Map()
input.forEach((c) => {
    const op = c.match(/=|-/)![0]
    const [label, lens] = c.split(/=|-/)
    let box = 0
    label.split('').forEach((c) => {
        box += c.charCodeAt(0)
        box *= 17
        box = box % 256
    })
    if (op == '-' && array.has(box)) {
        const filtered = array.get(box).filter((el: Map) => el.label !== label)
        array.set(box, filtered)
    } else {
        if (lens && array) {
            if (!array.has(box)) {
                array.set(box, [{ label, lens: parseInt(lens) }])
            } else {
                const exists = array
                    .get(box)
                    .find((el: Map) => el.label === label)
                if (exists) {
                    exists.lens = parseInt(lens)
                } else {
                    array.get(box).push({ label, lens: parseInt(lens) })
                }
            }
        }
    }
})
let total = 0
;[...array]
    .filter(([_, v]) => v.length !== 0)
    .forEach((k) => {
        const [box, slots] = k
        slots.forEach(
            (v: Map, i: number) => (total += (box + 1) * (i + 1) * v.lens)
        )
    })

console.log('🚀', total)

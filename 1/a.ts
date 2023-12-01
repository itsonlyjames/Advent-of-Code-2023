const txt = Deno.readTextFileSync('./input.txt')

const array: number[][] = [[]]
let pos = 0
txt.split('\n').forEach((line) => {
    const split = line.split('')
    if (!array[pos]) array[pos] = []
    split.forEach((val) => {
        const number = parseInt(val)
        if (!isNaN(number)) {
            array[pos].push(number)
        }
    })
    pos++
})

let total = 0
array.forEach((val) => {
    const first = val[0]
    const last = val[val.length - 1]
    const combined = `${first}` + `${last}`
    total += parseInt(combined)
})

console.log('🎅', total)

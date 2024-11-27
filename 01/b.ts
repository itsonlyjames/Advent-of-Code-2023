const txt = Deno.readTextFileSync('./input.txt')

const array: string | number[][] = [[]]
let pos = 0
const value: { [key: string]: number } = {
    on: 1,
    tw: 2,
    thre: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eigh: 8,
    nine: 9
}

txt.split('\n').forEach((line: string) => {
    if (!array[pos]) array[pos] = []
    const match = [
        ...line.matchAll(
            /on(?=e)|tw(?=o)|thre|four|five|six|seven|eigh(?=t)|nine|\d/g
        )
    ]
    match.forEach((val) => {
        const number = parseInt(val[0])
        if (!isNaN(number)) {
            array[pos].push(number)
        } else {
            array[pos].push(value[val[0]])
        }
    })
    pos++
})

let total = 0
array.forEach((val) => {
    const first = val[0]
    const last = val.pop()
    const combined = `${first}` + `${last}`
    total += parseInt(combined)
})

console.log(total)

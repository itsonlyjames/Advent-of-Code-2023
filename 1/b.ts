import fs from 'fs'
import path from 'path'
const txt = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')

const array: any = []
let pos: number = 0
const value: any = {
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
            /on(?=e)|tw(?=o)|thre|four|five|six|seven|eigh(?=t)|nine|1|2|3|4|5|6|7|8|9/g
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

let total: number = 0
array.forEach((val: string[], index: number) => {
    const first = val[0]
    const last = val.pop()
    const combined = `${first}` + `${last}`
    total += parseInt(combined)
})

console.log(total)

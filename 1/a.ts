import fs from 'fs'
import path from 'path'
const txt = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')

const lines = txt.split('\n')

const array: any = []
let pos = 0
lines.forEach((line) => {
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
array.forEach((val: string[]) => {
    const first = val[0]
    const last = val[val.length - 1]
    const combined = `${first}` + `${last}`
    total += parseInt(combined)
})

console.log(total)

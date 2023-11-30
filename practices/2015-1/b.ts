import fs from 'fs'
import path from 'path'
const txt = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')

const brackets = txt.split('')

const current: string[] = []

let pos = 0

while (current[0] !== ')') {
    pos++
    const next = brackets.shift()
    if (next === '(') {
        current.push(next)
    } else if (next === ')') {
        if (current.length === 0) {
            break
        }
        current.pop()
    }
}

console.log('pos', pos)

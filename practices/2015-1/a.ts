import fs from 'fs'
import path from 'path'
const txt = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')

const brackets = txt.split('')

const left = brackets.filter((val) => val === '(').length
const right = brackets.filter((val) => val === ')').length

console.log('count', left - right)

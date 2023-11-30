import fs from 'fs'
import path from 'path'
const txt = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')

const groups = txt.split('\n')

const groupedTotal: any = []
let runningIndex = 0
groups.forEach((item) => {
    if (item === '') {
        runningIndex++
    } else {
        const number = parseInt(item)
        if (!groupedTotal[runningIndex]) groupedTotal[runningIndex] = []
        groupedTotal[runningIndex].push(number)
    }
})

const totalled: number[] = []
groupedTotal.forEach((sum: []) => {
    totalled.push(
        sum.reduce((total: number, number: number) => (total += number), 0)
    )
})

const top3 = totalled
    .sort((a: number, b: number) => b - a)
    .slice(0, 3)
    .reduce((total: any, number: number) => (total += number), 0)

console.log('🧝 Most calories from an elf:', Math.max(...totalled))
console.log('🚀 Top 3 Elf Calories count:', top3)

const txt = Deno.readTextFileSync('./input.txt')

const brackets = txt.split('')

const left = brackets.filter((val: string) => val === '(').length
const right = brackets.filter((val: string) => val === ')').length

console.log('count', left - right)

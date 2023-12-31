const txt = Deno.readTextFileSync('./input.txt')

const lines = txt.split('\n')

let totalPart1 = 0
let totalPart2 = 0

lines.forEach((val) => {
    const running = val.split('x')
    const numbers = running.map((run) => parseInt(run))

    const [length, width, height] = numbers
    const min = Math.min(length * width, width * height, height * length)
    totalPart1 +=
        2 * length * width + 2 * width * height + 2 * height * length + min

    const ribbon = [length, width, height]
        .sort((a: number, b: number) => a - b)
        .splice(0, 2)
        .reduce((memo, number) => {
            memo += number * 2
            return memo
        }, 0)
    const bow = length * width * height
    totalPart2 += ribbon + bow
})

console.log(totalPart1, totalPart2)

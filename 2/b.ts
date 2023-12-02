const txt = Deno.readTextFileSync('./input.txt').split('\n')

const counter = txt.reduce((counter, item) => {
    const newItem = item.split(/: |, |; /)
    const colors = ['red', 'green', 'blue']
    const colorNums: { [key: string]: number[] } = {}

    newItem.every((val: string) => {
        for (const color of colors) {
            const regex = new RegExp(`\\d* ${color}`)
            const match = val.match(regex)
            if (match) {
                const num = parseInt(match[0])
                colorNums[color] = colorNums[color] || []
                colorNums[color].push(num)
            }
        }
        return true
    })

    counter +=
        Math.max(...colorNums.red) *
        Math.max(...colorNums.green) *
        Math.max(...colorNums.blue)

    return counter
}, 0)
console.log('🚀', counter)

const txt = Deno.readTextFileSync('./input.txt').split('\n')

const counter = txt.reduce((counter, item, index) => {
    const newItem = item.split(/: |, |; /)
    const colorThresholds: { [key: string]: number } = {
        red: 12,
        green: 13,
        blue: 14
    }

    const possible = newItem.every((val: string) => {
        for (const color of Object.keys(colorThresholds)) {
            const regex = new RegExp(`\\d* ${color}`)
            const match = val.match(regex)
            if (match) {
                const num = parseInt(match[0])
                if (num > colorThresholds[color]) {
                    return false
                }
            }
        }
        return true
    })

    if (possible) {
        counter += index + 1
    }

    return counter
}, 0)
console.log('🚀', counter)

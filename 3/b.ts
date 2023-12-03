const lines = Deno.readTextFileSync('./input.txt').split('\n')

let gearRatios = 0
const partNumbersByLines = lines.map((line) => {
    const matches = line.matchAll(/(\d+)/g)
    const partNumbers: { value: number; start: number; end: number }[] = []

    for (const match of matches) {
        partNumbers.push({
            value: Number(match[0]),
            start: match.index!,
            end: match.index! + match[0].length - 1
        })
    }

    return partNumbers
})

for (let row = 0; row < lines.length; row++) {
    const matches = [...lines[row].matchAll(/\*/g)]
    for (const match of matches) {
        const parts = [
            ...partNumbersByLines[row],
            ...partNumbersByLines[row - 1],
            ...partNumbersByLines[row + 1]
        ].filter((part) => {
            if (part.start - 1 <= match.index! && match.index! <= part.end + 1)
                return part.value
        })

        if (parts.length === 2) {
            gearRatios += parts[0].value * parts[1].value
        }
    }
}

console.log('🚀', gearRatios)

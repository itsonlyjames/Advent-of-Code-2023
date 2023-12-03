const lines = Deno.readTextFileSync('./input.txt').split('\n')

let sum = 0
for (let row = 0; row < lines.length; row++) {
    const matches = [...lines[row].matchAll(/(\d+)/g)]

    const prevLine = lines[row - 1] || ''
    const nextLine = lines[row + 1] || ''

    for (const match of matches) {
        const textBlock = [
            prevLine.substring(
                match.index! - 1,
                match.index! + match[0].length + 1
            ),
            lines[row].substring(
                match.index! - 1,
                match.index! + match[0].length + 1
            ),
            nextLine.substring(
                match.index! - 1,
                match.index! + match[0].length + 1
            )
        ]

        const foundSymbol = textBlock.join('').match(/[^\d.]/)
        if (foundSymbol) sum += Number(match[0])
    }
}

console.log('🚀', sum)

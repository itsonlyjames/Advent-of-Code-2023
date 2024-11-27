const lines = Deno.readTextFileSync('./input.txt').split('\n')
const cardTable: { [key: string]: number } = {}

lines.forEach((line, index) => {
    cardTable[index + 1] = 1
})

lines.forEach((line, index) => {
    const split = line.split(/: | \| /g)
    const winningNumbers = split[1].match(/\d+/g)?.map((val) => parseInt(val))
    const myNumbers = split[2].match(/\d+/g)?.map((val) => parseInt(val))

    let copyCounter = 0
    for (const myNumber of myNumbers!) {
        if (winningNumbers!.includes(myNumber)) {
            copyCounter++
        }
    }

    for (let j = 0; j < copyCounter; j++) {
        cardTable[j + index + 2] += cardTable[index + 1]
    }
})

const scratchcards = Object.values(cardTable).reduce(
    (curr, prev) => (prev += curr),
    0
)

console.log('🚀', scratchcards)

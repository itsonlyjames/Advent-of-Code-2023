const lines = Deno.readTextFileSync('./input.txt').split('\n')

const sum = lines.reduce((sum, line) => {
    let counter = 0
    const split = line.split(/: | \| /g)
    const winningNumbers = split[1].match(/\d+/g)?.map((val) => parseInt(val))
    const myNumbers = split[2].match(/\d+/g)?.map((val) => parseInt(val))

    for (const myNumber of myNumbers!) {
        if (winningNumbers!.includes(myNumber)) {
            counter === 0 ? (counter += 1) : (counter += counter)
        }
    }

    return (sum += counter)
}, 0)

console.log('🚀', sum)

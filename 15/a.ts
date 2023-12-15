const input = Deno.readTextFileSync('./input.txt').split(',')

let total = 0
input.forEach((c) => {
    const arr = c.split('')
    let am = 0
    arr.forEach((ch) => {
        am += ch.charCodeAt(0)
        am *= 17
        am = am % 256
    })
    total += am
})

console.log('🚀', total)

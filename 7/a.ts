const lines = Deno.readTextFileSync('./input.txt').split(/\n/)

type Hand = { cards: string; bid: number; kinds: number[] }
type CardCounts = Record<string, number>

const cardRanks = 'AKQJT98765432'.split('')

const total = lines
    .map((line: string) => {
        const [cards, bid] = line.split(' ')
        const counts: CardCounts = {}
        for (let i = 0; i < cards.length; i++) {
            if (counts[cards[i]]) counts[cards[i]]++
            else counts[cards[i]] = 1
        }
        const kinds = Object.values(counts)
        kinds.sort((a, b) => b - a)
        return { cards, kinds, bid: Number(bid) }
    })
    .toSorted((h1: Hand, h2: Hand) => {
        for (let i = 0; i < 5; i++) {
            if (!h1.kinds[i] || !h2.kinds[i]) break
            if (h1.kinds[i] > h2.kinds[i]) return 1
            if (h1.kinds[i] < h2.kinds[i]) return -1
        }

        for (let i = 0; i < 5; i++) {
            if (cardRanks.indexOf(h1.cards[i]) < cardRanks.indexOf(h2.cards[i]))
                return 1
            if (cardRanks.indexOf(h1.cards[i]) > cardRanks.indexOf(h2.cards[i]))
                return -1
        }

        return 0
    })
    .reduce((sum, { bid }, i) => sum + bid * (i + 1), 0)

console.log('🚀', total)

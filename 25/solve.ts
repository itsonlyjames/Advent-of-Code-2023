import { mincut } from '@graph-algorithm/minimum-cut'
const input = Deno.readTextFileSync('./input.txt').split(/\n/)

type Connection = [from: string, to: string]

class TupleSet<TTuple extends any[]> {
    #set: Set<string>

    constructor(iterable?: TTuple[] | TupleSet<TTuple> | Set<TTuple>) {
        if (!iterable) {
            this.#set = new Set<string>()
            return
        }

        const strings = [...iterable].map((point) => JSON.stringify(point))
        this.#set = new Set<string>(strings)
    }

    get size() {
        return this.#set.size
    }

    *[Symbol.iterator]() {
        for (const value of this.#set[Symbol.iterator]()) {
            yield JSON.parse(value) as TTuple
        }
    }

    add(point: TTuple) {
        this.#set.add(JSON.stringify(point))
        return this
    }

    clear() {
        this.#set.clear()
    }

    delete(point: TTuple) {
        return this.#set.delete(JSON.stringify(point))
    }

    *entries(): IterableIterator<[TTuple, TTuple]> {
        for (const [value1, value2] of this.#set.entries()) {
            yield [JSON.parse(value1), JSON.parse(value2)] as [
                point: TTuple,
                point: TTuple
            ]
        }
    }

    forEach(
        callbackfn: (
            point: TTuple,
            point2: TTuple,
            points: TupleSet<TTuple>
        ) => void,
        thisArg?: () => void
    ) {
        this.#set.forEach((value) => {
            const point = JSON.parse(value) as TTuple
            callbackfn.call(thisArg, point, point, this)
        })
    }

    has(point: TTuple) {
        return this.#set.has(JSON.stringify(point))
    }

    *keys(): IterableIterator<TTuple> {
        for (const key of this.#set.keys()) {
            yield JSON.parse(key) as TTuple
        }
    }

    *values(): IterableIterator<TTuple> {
        for (const value of this.#set.values()) {
            yield JSON.parse(value) as TTuple
        }
    }
}

function getProductOfGroupSizes(connections: TupleSet<Connection>) {
    let connectionArray = [...connections]

    for (const [from, to] of mincut(connectionArray)) {
        connections.delete([from, to])
        connections.delete([to, from])
    }

    connectionArray = [...connections]

    const groups: string[][] = []
    const components = new Set<string>(connectionArray.flat())
    const visited = new Set<string>()

    for (const component of components) {
        if (visited.has(component)) continue

        const group: string[] = []
        const queue = [component]

        while (queue.length) {
            const component = queue.shift()!

            if (visited.has(component)) continue

            visited.add(component)

            group.push(component)

            const links = connectionArray
                .filter((connection) => connection.includes(component))
                .flat()

            queue.push(...links)
        }

        groups.push(group)
    }

    return groups.map((group) => group.length).reduce((a, b) => a * b)
}

const connections = () => {
    const connections = new TupleSet<Connection>()

    for (const line of input) {
        const [left, right] = line.split(': ')
        for (const r of right.split(' ')) connections.add([left, r])
    }

    return connections
}

const productOfGroupSizes = getProductOfGroupSizes(connections())

console.log('🚀 part 1:', productOfGroupSizes)

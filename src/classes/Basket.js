export default class Basket {
    constructor(basketDoc) {
        this.id = basketDoc.id
        const data = basketDoc.data()

        this.title = data.title
        this.description = data.description
        this.collected = data.collected
        this.target = data.target
        this.assets = data.assets
        this.holders = data.holders
    }

    async buyPending() {}

    async sellPending() {}
}
export default class Assets {
    constructor(assetDocs) {
        this.id = assetDocs.id
        const data = assetDocs.data()

        this.name = data.name
        this.symbol = data.symbol
        this.iconUrl = data.icon_url
        this.createdAt = data.created_at
    }
}
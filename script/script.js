class prodotto {
    constructor(name, description, brand, imageUrl, price, _id, userID, createdAt, updatedat, __V) {
        this.name = name
        this.description = description
        this.brand = brand
        this.imageUrl = imageUrl
        this.price = price
        this._id = _id
        this.userID = userID
        this.createdAt = createdAt
        this.updatedat = updatedat,
            this.__V = __V
    }
    constructor(name, description, brand, imageUrl, price) {
        this.name = name
        this.description = description
        this.brand = brand
        this.imageUrl = imageUrl
        this.price = price
        this._id = ""
        this.userID = ""
        this.createdAt = ""
        this.updatedat = "",
            this.__V = ""
    }
}
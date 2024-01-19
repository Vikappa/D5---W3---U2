class prodotto {
    constructor(name, description, brand, imageUrl, price, _id = "not generated", userID = "not generated", createdAt = "not generated", updatedat = "not generated", __V = "not generated") {
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
}
/////////////////////////////////////// VARIABILI COMUNI PAGINA ///////////////////////////////////////////////////////
let adminPassword = "abc"
///////////////////////////////////////////////// DOM CONTROL ///////////////////////////////////////////////////////
const updateLoginLogoutLinks = function () {
    let inputPassword = localStorage.getItem("passwordGS")
    console.log(inputPassword.length)

    if (inputPassword === adminPassword) {
        document.getElementById('adminTools').classList.remove('d-none')
    } else {
        document.getElementById('adminTools').classList.add('d-none')

    }
}

////////////////////////////////////////////////// METODI ////////////////////////////////////////////////////////////

//////////////////////////////////////////////////ESECUZIONE//////////////////////////////////////////////////////////
updateLoginLogoutLinks()

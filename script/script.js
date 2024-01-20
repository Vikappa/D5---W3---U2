class prodottoRicevuto {
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

    buildCard() {
        return `<div class="card" style="width: 18rem;">
        <img src="${this.imageUrl}" class="card-img-top" alt="${this.description}">
        <div class="card-body">
          <h5 class="card-title">${this.name}</h5>
          <p class="card-text">${this.description} , ${this.brand}, ${this.price}</p>
          <a href="#" class="btn btn-primary"><img src="../assets/media/addtocart.svg"></a>
        </div>
        </div>`
    }

}
/////////////////////////////////////// VARIABILI COMUNI PAGINA ///////////////////////////////////////////////////////
let adminPassword = "abc"
///////////////////////////////////////////////// DOM CONTROL ///////////////////////////////////////////////////////
const updateLoginLogoutLinks = function () {
    let inputPassword = localStorage.getItem("passwordGS")

    if (inputPassword === adminPassword) {
        document.getElementById('adminTools').classList.remove('d-none')
    } else {
        document.getElementById('adminTools').classList.add('d-none')

    }
}


////////////////////////////////////////////////// METODI ////////////////////////////////////////////////////////////

//////////////////////////////////////////////////ESECUZIONE//////////////////////////////////////////////////////////
updateLoginLogoutLinks()

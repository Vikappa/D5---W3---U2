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
const riempiGlobal = function (arrayGlobal) {
    let stringaGlobal = ``
    for (let index = 0; index < arrayGlobal.length; index++) {
        console.log(arrayGlobal[index])

        stringaGlobal = stringaGlobal +
            `<div class="card cardGlobal">
<div class="card-img-overlay">
  <h5 class="card-title">${arrayGlobal[index].name}</h5>
  <p class="card-text"><small class="text-white">€${arrayGlobal[index].price}</small></p>
</div>
<img src="${arrayGlobal[index].imageUrl}" class="card-img-bottom" alt="${arrayGlobal[index].name}">
</div>`
    }

    document.getElementById('containerAll').innerHTML = stringaGlobal
}

const sincronizzaProdottiScaricati = function () {
    prodottiScaricati = []
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY2MDE4N2U1YzAwMTgxNGM1ZjYiLCJpYXQiOjE3MDU2NTIwNjQsImV4cCI6MTcwNjg2MTY2NH0.xxf1hSNP01Dcmf12PU4LL1ffA0S89nYHE4SCxrhtkwY"
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('errore nella chiamata')
            }
        })
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                let newProdottoScaricato = new prodottoRicevuto(
                    data[i].name,
                    data[i].description,
                    data[i].brand,
                    data[i].imageUrl,
                    data[i].price,
                    data[i]._id,
                    data[i].userID,
                    data[i].createdAt,
                    data[i].updatedat,
                    data[i].__V,
                )
                prodottiScaricati.push(newProdottoScaricato)
            }
            riempiGlobal(prodottiScaricati)
        })
        .catch((err) => {
            console.log(err)
        })
}

sincronizzaProdottiScaricati()

//////////////////////////////////////////////////ESECUZIONE//////////////////////////////////////////////////////////
updateLoginLogoutLinks()

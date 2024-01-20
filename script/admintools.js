class newProdotto {
    constructor(name, description, brand, imageUrl, price) {
        this.name = name
        this.description = description
        this.brand = brand
        this.imageUrl = imageUrl
        this.price = price
    }

}

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
        return `<div class="card productCard col-3 m-2">
<img src="${this.imageUrl}" class="card-img-top" alt="${this.description}">
<div class="card-body">
  <h5 class="card-title>${this.name}</h5>
  <p class="card-text fs-6">${this.description} , ${this.brand}, €${this.price}</p>
  <a href="#" class="btn btn-primary" onclick=deleteProd("${this._id}") >Elimina</a>
</div>
</div>`
    }

}

const riempiColonnaProdotti = function () {
    let stringa_prodotti_esistenti = ``
    for (let e = 0; e < prodottiScaricati.length; e++) {
        stringa_prodotti_esistenti = stringa_prodotti_esistenti + prodottiScaricati[e].buildCard()
    }

    document.getElementById('productsPanel').innerHTML = stringa_prodotti_esistenti
}

const sendProd = function (prodottoDaInviare) { //Invia oggetto newProdotto
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        body: JSON.stringify(prodottoDaInviare),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY2MDE4N2U1YzAwMTgxNGM1ZjYiLCJpYXQiOjE3MDU2NTIwNjQsImV4cCI6MTcwNjg2MTY2NH0.xxf1hSNP01Dcmf12PU4LL1ffA0S89nYHE4SCxrhtkwY" // Token di autorizzazione
        },
    })
        .then(response => response.json())
        .then(data => console.log("Invio riuscito " + data))
        .catch(error => console.error('Errore:', error))
    sincronizzaProdottiScaricati()
    riempiColonnaProdotti()
}

const deleteProd = function (idDaEliminare) { // deleta in base alla stringa id dell'oggetto ricevuto dal server

    fetch(`https://striveschool-api.herokuapp.com/api/product/${idDaEliminare}`, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY2MDE4N2U1YzAwMTgxNGM1ZjYiLCJpYXQiOjE3MDU2NTIwNjQsImV4cCI6MTcwNjg2MTY2NH0.xxf1hSNP01Dcmf12PU4LL1ffA0S89nYHE4SCxrhtkwY" // Token di autorizzazione
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Errore nella richiesta DELETE')
            }
        })
        .catch(error => console.error('Errore:', error))
    sincronizzaProdottiScaricati()
    riempiColonnaProdotti()
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
            riempiColonnaProdotti()
        })
        .catch((err) => {
            console.log(err)
        })
    console.log(prodottiScaricati)
}

const sendProdotto = function (event) {
    event.preventDefault()
    let daInviare = new newProdotto(
        document.getElementById('nomeProdotto').value,
        document.getElementById('descrizioneProdotto').value,
        document.getElementById('brandProdotto').value,
        document.getElementById('urlImgProdotto').value,
        document.getElementById('prezzoProdotto').value)
    sendProd(daInviare)
}

let prodottiScaricati = []




////////////////////////////////////////////////// COLLEGAMENTI DOM //////////////////////////////////////////////////////
const colonnaProdotti = document.getElementById('productsPanel')
const colonnaForm = document.getElementById('formPanel')
////////////////////////////////////////////////// RIEMPIMENTO PRINCIPALE ///////////////////////////////////////////////
sincronizzaProdottiScaricati()
let prodottiScaricati = []
let carrello = []
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
let inputPassword
let sessionPassword = sessionStorage.getItem('userPassword')
////////////////////////////////////////////////// METODI ////////////////////////////////////////////////////////////
const riempiGlobal = function (arrayGlobal) {
    let stringaGlobal = ``
    for (let index = 0; index < arrayGlobal.length; index++) {
        stringaGlobal = stringaGlobal +
            `<div class="card cardGlobal" onclick="modaleProdotto('${arrayGlobal[index]._id}')">
<div class="card-img-overlay">
  <h5 class="card-title">${arrayGlobal[index].name}</h5>
  <p class="card-text"><small class="text-white">€${arrayGlobal[index].price}</small></p>
</div>
<img src="${arrayGlobal[index].imageUrl}" class="card-img-bottom" alt="${arrayGlobal[index].name}">
</div>`
    }

    document.getElementById('containerAll').innerHTML = stringaGlobal

}

const aggiungiAlCarrello = function (id) { //aggiunge un oggetto prodotto all'array carrello partendo dall'id e scorrendo l'array di prodotti globali

    for (let i = 0; i < prodottiScaricati.length; i++) {
        let prodotto = prodottiScaricati[i]
        if (prodotto._id === id) {
            carrello.push(prodotto)
            let carrelloStorato = JSON.stringify(carrello)
            let chiaveStorage = "chiaveCarrello" + sessionPassword
            localStorage.setItem(chiaveStorage, carrelloStorato)
        }
    }
    updateLinkCarrello(carrello)
}

const updateLinkCarrello = function () {
    let passCorrenteSessione = sessionStorage.getItem('userPassword')

    let memoriaStringata = localStorage.getItem("chiaveCarrelloaaa")
    let carrelloCaricato = [...JSON.parse(memoriaStringata)]
    console.log(carrelloCaricato)
    document.getElementById('linkCarrello').innerHTML = `<img src="./assets/media/cart.svg" alt="home" height="26"
    class="d-inline-block align-text-top"> Carrello (0€)`


    if (carrelloCaricato.length > 0) {
        console.log("Carrello storato non trovato")
        document.getElementById('linkCarrello').innerHTML = `<img src="./assets/media/cart.svg" alt="home" height="26"
        class="d-inline-block align-text-top"> Carrello (Soldi€)`
    }

    let internoDropDownCarrello = `<ul class="dropdown-menu rounded-1" id="dropDownCarrello">`

    if (carrelloCaricato.length = 0) {
        internoDropDownCarrello += `<button>Vuot</button></ul>`

    }
    let totaleCash = 0
    for (let index = 0; index < carrelloCaricato.length; index++) {
        totaleCash += carrelloCaricato[index].price
        internoDropDownCarrello += `<li><a class="dropdown-item" href="#">${carrelloCaricato}</a></li>`
        if (index === (carrelloCaricato.length - 1)) {
            internoDropDownCarrello += `<li><a class="dropdown-item" href="#">Totale: ${totaleCash}€</a></li>`

        }
    }
    document.getElementById('dropDownCarrello').innerHTML = internoDropDownCarrello
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

const scriviPassWord = function (inputPassword) {
    sessionStorage.setItem('userPassword', inputPassword)
    sessionPassword = inputPassword
    if (!sessionPassword) {
        console.log("disabilito carrello")
        document.getElementById('linkCarrello').classList.add("disabled")
        document.getElementById('linkCarrello').classList.add("text-secondary")
    } else {
        console.log("abilito carrello")
        document.getElementById('linkCarrello').classList.remove("disabled")
        document.getElementById('linkCarrello').classList.remove("text-secondary")
    }


    updateLinkCarrello()
}
///////////////////////////////////////////////// DOM CONTROL ///////////////////////////////////////////////////////
document.getElementById('passForm').addEventListener('submit', function (event) {
    event.preventDefault()
    let inputPassword = document.getElementById('navbarPassword').value
    document.getElementById('navbarPassword').value = ``


    if (inputPassword === adminPassword) {
        document.getElementById('adminTools').classList.remove('d-none')
    } else {
        document.getElementById('adminTools').classList.add('d-none')

    }

    scriviPassWord(inputPassword)
})

const leggiSessionPassword = function () {
    if (sessionStorage.getItem('userPassword') === adminPassword) {
        document.getElementById('adminTools').classList.remove('d-none')
        sessionPassword = sessionStorage.getItem('userPassword')

    } else {
        document.getElementById('adminTools').classList.add('d-none')
    }
}

const chiudiModale = function () {

    //document.querySelector('#modaleEsponiProdotto').remove()
}

let prodottoDaEsporre = prodottiScaricati.find(prodotto => prodotto._id === idProdottoDaEsporre)

const modaleProdotto = function (idProdottoDaEsporre) {
    const pulsanteModale = function () {
        if (!sessionPassword) {
            console.log("disabilito aggiungi al carrello")
            return `<button type="button" class="btn disabled " id="aggiungiAlCarrello" onclick="aggiungiAlCarrello('${prodottoDaEsporre._id}')">Login Necessario</button>`
        } else {
            console.log("abilito aggiungi al carrello")
            return `<button type="button" class="btn btn-success" id="aggiungiAlCarrello" onclick="aggiungiAlCarrello('${prodottoDaEsporre._id}')">Aggiugni al carrello €${prodottoDaEsporre.price}</button>`
        }
    }

    let prodottoDaEsporre = prodottiScaricati.find(prodotto => prodotto._id === idProdottoDaEsporre)

    let modalHTML = `
            <div class="modal fade" id="modaleEsponiProdotto" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header d-flex flex-column align-items-end">
                        <h4 class="modal-title" id="modalLabel">${prodottoDaEsporre.brand}</h4>
                        <h5 class="modal-title" id="modalLabel">${prodottoDaEsporre.name}</h5>
                        </div>
                        <div class="modal-body">
                        ${prodottoDaEsporre.description}
                        <img class="img-fluid mx-auto" style="max-height: 350px" src="${prodottoDaEsporre.imageUrl}"
                        </div>
                        <div class="modal-footer">
                        ${pulsanteModale()}
                        <a  href="./index.html"><button type="button" class="btn btn-secondary">Chiudi</button>
                        </div>
                    </div>
                </div>
            </div>
            `
    document.body.innerHTML += modalHTML
    $('#modaleEsponiProdotto').modal('show')


}
//////////////////////////////////////////////////ESECUZIONE//////////////////////////////////////////////////////////
sincronizzaProdottiScaricati()
leggiSessionPassword()
updateLinkCarrello()

if (!sessionPassword) {
    document.getElementById('linkCarrello').classList.add("disabled")
    document.getElementById('linkCarrello').classList.add("text-secondary")
} else {
    document.getElementById('linkCarrello').classList.remove("disabled")
    document.getElementById('linkCarrello').classList.remove("text-secondary")
}


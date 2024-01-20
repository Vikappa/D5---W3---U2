
let prodottiScaricati = []

class itemCarosello {
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

const inserisciCarosello = function (arrayProd) {
    document.getElementById('contenitoreCarouselItem').innerHTML =
        `<div id="" class="carousel-item caroselloCarta active">
    <div class="col-md-3">
        <div class="card">
            <div class="card-img">
                <img src="${arrayProd[0].imageUrl}" class="img-fluid">
            </div>
            <div class="card-img-overlay caroselloItemNome">${arrayProd[0].name}</div>
        </div>
    </div>
</div>

<div id="carouselCard" class="carousel-item caroselloCarta">
    <div class="col-md-3">
        <div class="card">
            <div class="card-img">
                <img src="${arrayProd[1].imageUrl}" class="img-fluid">
            </div>
            <div class="card-img-overlay caroselloItemNome">${arrayProd[2].name}</div>
        </div>
    </div>
</div>

<div id="carouselCard" class="carousel-item caroselloCarta">
    <div class="col-md-3">
        <div class="card">
            <div class="card-img">
                <img src="${arrayProd[2].imageUrl}" class="img-fluid">
            </div>
            <div class="card-img-overlay caroselloItemNome">${arrayProd[3].name}</div>
        </div>
    </div>
</div>
<div id="carouselCard" class="carousel-item caroselloCarta">
    <div class="col-md-3">
        <div class="card">
            <div class="card-img">
                <img src="${arrayProd[3].imageUrl}" class="img-fluid">
            </div>
            <div class="card-img-overlay caroselloItemNome">${arrayProd[4].name}</div>
        </div>
    </div>
</div>
<div id="carouselCard" class="carousel-item caroselloCarta">
    <div class="col-md-3">
        <div class="card">
            <div class="card-img">
                <img src="${arrayProd[4].imageUrl}" class="img-fluid">
            </div>
            <div class="card-img-overlay caroselloItemNome">${arrayProd[5].name}</div>
        </div>
    </div>
</div>
<div id="carouselCard" class="carousel-item">
    <div class="col-md-3">
        <div class="card">
            <div class="card-img">
                <img src="${arrayProd[5].imageUrl}" class="img-fluid">
            </div>
            <div class="card-img-overlay caroselloItemNome">${arrayProd[6].name}</div>
        </div>
    </div>
</div>`

    let items = document.querySelectorAll('.carousel .carousel-item')

    items.forEach((el) => {
        const minPerSlide = 4
        let next = el.nextElementSibling
        for (var i = 1; i < minPerSlide; i++) {
            if (!next) {
                // wrap carousel by using first child
                next = items[0]
            }
            let cloneChild = next.cloneNode(true)
            el.appendChild(cloneChild.children[0])
            next = next.nextElementSibling
        }
    })

}

const download6 = function () {
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
                if (prodottiScaricati.length < 7) {
                    prodottiScaricati.push(newProdottoScaricato)
                }
            }
            inserisciCarosello(prodottiScaricati)

        })
        .catch((err) => {
            console.log(err)
        })
}

download6()






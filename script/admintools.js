class newProdotto {
    constructor(name, description, brand, imageUrl, price) {
        this.name = name
        this.description = description
        this.brand = brand
        this.imageUrl = imageUrl
        this.price = price
    }

}


const sendProd = function () {
    fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        body: JSON.stringify(prodottoDaInviare),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMmY2MDE4N2U1YzAwMTgxNGM1ZjYiLCJpYXQiOjE3MDU2NTIwNjQsImV4cCI6MTcwNjg2MTY2NH0.xxf1hSNP01Dcmf12PU4LL1ffA0S89nYHE4SCxrhtkwY" // Token di autorizzazione
        },
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Errore:', error))
}

const deleteProd = function (idDaEliminare) {

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
        .then(data => console.log('Oggetto eliminato:', data))
        .catch(error => console.error('Errore:', error))
}

deleteProd("65aa54aa187e5c001814c6a8")

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
        console.log(data)
    })
    .catch((err) => {
        console.log(err)
    })



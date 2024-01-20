let arrayEsempio = []

const inietta = function (prodottoDaInviare) { //Invia oggetto newProdotto
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
}

const sincronizzaProdottiApi = function () {
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

let ese1 = new newProdotto("Eleganza Classica",
    "Una cravatta raffinata, realizzata in seta pura al 100%, caratterizzata da un design classico e intramontabile. Ideale per occasioni formali.",
    "Sartoria Italiana",
    "https://m.media-amazon.com/images/I/71Q3IpwYaxL.jpg",
    "250")
arrayEsempio.push(ese1)

let ese2 = new newProdotto(
    "Moderno Distinto",
    "Cravatta in cashmere di alta qualità, con un tocco moderno grazie al suo pattern geometrico. Morbida al tatto e perfetta per un look business.",
    "Prestige Paris",
    "https://m.media-amazon.com/images/I/41qtVA2GGEL._AC_SY1000_.jpg",
    "300")
arrayEsempio.push(ese2)

let ese3 = new newProdotto(
    "Sfumatura d'arte",
    "Un'opera d'arte portabile, questa cravatta è dipinta a mano da artisti rinomati. Ogni pezzo è unico, con sfumature e disegni che catturano l'attenzione.",
    "Artistic Touch",
    "https://m.media-amazon.com/images/I/81Cs5SLw6mL._AC_UY1000_.jpg",
    "350")
arrayEsempio.push(ese3)

let ese4 = new newProdotto(
    "Business Luxe",
    "Elegante cravatta in seta con fili d'oro intessuti. Il suo design sobrio ma lussuoso è ideale per incontri d'affari di alto livello.",
    "Gold Thread London",
    "https://m.media-amazon.com/images/I/615tDvU9HTS._AC_UF1000,1000_QL80_.jpg",
    "280")
arrayEsempio.push(ese4)

let ese5 = new newProdotto(
    "Royal Blue",
    "Cravatta in velluto di color blu reale, perfetta per eventi serali e occasioni speciali. La sua texture ricca aggiunge un tocco di classe ad ogni outfit.",
    "Velvet Elegance",
    "https://m.media-amazon.com/images/I/81ejSnM8X-L._AC_UF894,1000_QL80_.jpg",
    "320")
arrayEsempio.push(ese5)

let ese6 = new newProdotto(
    "Sartorial Splendor",
    "Un'elegante cravatta in seta jacquard, con un design sofisticato e unico. Perfetta per occasioni formali, combina classico stile con moderna eleganza.",
    "Sartoria Italiana",
    "https://m.media-amazon.com/images/I/814KqR0mxqL.jpg",
    "275")
arrayEsempio.push(ese6)

let ese7 = new newProdotto(
    "Midnight Charm",
    "Un'espressione di pura eleganza, questa cravatta in seta nera è l'accessorio perfetto per eventi serali e cene di gala. Design minimalista ma di impatto.",
    "Prestige Paris",
    "https://images-na.ssl-images-amazon.com/images/I/61u7TrbucJL._AC_UL1250_.jpg",
    "330")
arrayEsempio.push(ese7)

let ese8 = new newProdotto(
    "Geometric Passion",
    "Un'audace combinazione di lana e seta, questa cravatta presenta un intrigante modello geometrico. Ideale per un look business moderno e dinamico.",
    "Modern Threads",
    "https://th.bing.com/th/id/OIP.chBCa6XYlpImFmMuzgmsuAHaef?rs=1&pid=ImgDetMain",
    "290")
arrayEsempio.push(ese8)

let ese9 = new newProdotto(
    "Oceanic Elegance",
    "Ispirata alla bellezza dell'oceano, questa cravatta in seta presenta un raffinato motivo marino. Perfetta per eventi estivi e occasioni speciali.",
    "Artistic Touch",
    "https://th.bing.com/th/id/OIP.upjV5bkirnB7-sp-8E0XxgHaHa?rs=1&pid=ImgDetMain",
    "360")
arrayEsempio.push(ese9)

let ese10 = new newProdotto(
    "Classic Gold",
    "Un classico reinventato, questa cravatta in seta con dettagli dorati combina tradizione e lusso. Ideale per serate formali e incontri d'affari di prestigio.",
    "Gold Thread London",
    "https://m.media-amazon.com/images/I/61AB8-EQ-YL._AC_UY780_.jpg",
    "310")
arrayEsempio.push(ese10)

const iniettaArrayEsempio = function () {
    arrayEsempio.forEach(ese => {
        inietta(ese)
    })
    sincronizzaProdottiApi()
}

let ese11 = new newProdotto(
    "Silk Spectacle",
    "Una cravatta esclusiva in seta con intricati motivi floreali, perfetta per occasioni che richiedono un tocco di eleganza naturale.",
    "Nature's Elegance",
    "https://www.amazon.co.uk/PJRYC-Business-NeckTie-Formal-Wedding/dp/B09K3S8YLJ",
    "290")
arrayEsempio.push(ese11)

let ese12 = new newProdotto(
    "Gentleman's Choice",
    "Un classico senza tempo, questa cravatta in seta blu navy è un must-have per ogni guardaroba maschile. Versatile e raffinata.",
    "Sartoria Italiana",
    "https://m.media-amazon.com/images/I/71N+bemjudL._AC_UF350,350_QL80_.jpg",
    "260")
arrayEsempio.push(ese12)

let ese13 = new newProdotto(
    "Red Elegance",
    "Cravatta in seta rossa con una texture unica che cattura la luce in modo straordinario, ideale per serate di gala e occasioni formali.",
    "Prestige Paris",
    "https://m.media-amazon.com/images/I/71t+PZnqUqL._AC_UY580_.jpg",
    "320")
arrayEsempio.push(ese13)

let ese14 = new newProdotto(
    "Golden Weave",
    "Questa cravatta presenta un ricco intreccio di seta e fili d'oro, offrendo un aspetto lussuoso e una texture straordinaria.",
    "Gold Thread London",
    "https://m.media-amazon.com/images/I/61gdinvm09L._AC_UY1000_.jpg",
    "340")
arrayEsempio.push(ese14)

let ese15 = new newProdotto(
    "Modern Art",
    "Un'audace cravatta con un pattern artistico moderno, perfetta per distinguersi in occasioni business o sociali.",
    "Contemporary Style",
    "https://m.media-amazon.com/images/I/81dHRfsb-6L._AC_UF1000,1000_QL80_.jpg",
    "310")
arrayEsempio.push(ese15)

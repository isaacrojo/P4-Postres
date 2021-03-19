const express = require("express");
const createError = require("http-errors");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Información para la página
let postresSuaves = [
    {
        id: 1,
        nombre: 'Flan',
        sabor: 'Vainilla',
        img: '/img/kobby-mendez-4rymwWECY7I-unsplash.jpg',
        cssClass: 'postre-frio',
        tipoPostre: 'suaves',
    },
    {
        id: 2,
        nombre: 'Pay',
        sabor: 'Manzana',
        img: '',
        tipoPostre: 'suaves',
    },
    {
        id: 3,
        nombre: 'Pastel',
        sabor: 'Tres leches',
        img: '',
        tipoPostre: 'suaves',
    },
    {
        id: 4,
        nombre: 'Pastel',
        sabor: 'Chocolate',
        img: '',
        tipoPostre: 'suaves',
    },
    {
        id: 5,
        nombre: 'Nieve',
        sabor: 'Chocolate',
        img: '',
        tipoPostre: 'suaves',
    },
    {
        id: 6,
        nombre: 'Gelatina',
        sabor: 'Mango',
        img: '',
        tipoPostre: 'suaves',
    },
];
let postresBebidas = [
    {
        id: 1,
        nombre: 'Malteada',
        sabor: 'Fresa',
        img: '',
        cssClass: 'postre-frio',
        tipoPostre: 'bebidas',
    },
    {
        id: 2,
        nombre: 'Malteada',
        sabor: 'Nutella',
        img: '',
        tipoPostre: 'bebidas',
    },
    {
        id: 3,
        nombre: 'Malteada',
        sabor: 'Chocolate',
        img: '',
        tipoPostre: 'bebidas',
    },
];

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("pages/index", {});
});

app.get("/postres/suaves", (req, res) => {
    res.render("pages/postres/suaves", {
        postres: postresSuaves
    });
});

// /postres/suaves/postre?id=1
// /postres/suaves/postre?id=2

// /postres/suaves/postre?id=1
// /postres/bebidas/postre?id=1
/// los dos puntos indican que es un parametro :
// o variable nombrada con name=  en html
app.get("/postres/:tipoPostre/postre", (req, res, next) => {
    // Query Params
    // ?id=1
    // req.query.id
    // for (const key in object) {
    //     if (Object.hasOwnProperty.call(object, key)) {
    //         const element = object[key];
            
    //     }
    // }

    // Route params
    // :tipoPostre
    // req.params.tipoPostre
    
    let id = req.query.id; //es un string
    let tipoPostre = req.params.tipoPostre;
    let postres = [];
    switch (tipoPostre) {
        case "suaves":
            postres = postresSuaves;
            break;
        case "bebidas":
            postres = postresBebidas;
            break;
        case "frios":
            postres = postresFrios;
            break;
    
        default:
            // No coincide con un valor esperado
            break;
    }

    for (let i = 0; i < postres.length; i++) {
        const postre = postres[i];
        
        if (postre.id.toString() === id) { //*
            //return finalizar función actual (req, res)
            return res.render("pages/postres/postre", {
                // postre: postre
                postre
            });
        }
    }

    // TODO: Mostrar error 404 
    //(Next es pamandar a la siguiente ruta o middleware jaja)
    return next();


    // for (const i of postresSuaves) {
    // }
    // array.forEach(element => {
        
    // });
});

app.get("/search", (req, res) => {
    res.render("pages/search", {});
});

app.get("/about", (req, res) => {
    res.render("pages/about", {});
});




app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    let message = err.message;
    let error = err;

    res.status(err.status || 500);
    res.render("pages/error", {
        message,
        error
    });
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
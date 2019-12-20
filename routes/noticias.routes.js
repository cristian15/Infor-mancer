let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');          // carga la libreria del JSON Web Token de Auth0
let config = require('../config/config');       // carga el archivo de configuracion

let app = express();

let Noticia = require('../models/noticias.model'); 
let mdVerificaToken = require('../middlewares/auth');


// Nuevo Noticia
app.post('/',mdVerificaToken.verificaToken, (req, res) => {
    let body = req.body;
    let noticia = new Noticia({
        titulo: body.titulo,            //lo que biene despues del body es el nombre que esta en el formulario 
        resumen: body.resumen,
        cuerpo: body.cuerpo,
        imagen:body.imagen,
      
    });
    noticia.save((err, newNoticia) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msj: 'Error al crear la Noticia',
                errors: err
            });
        }
        
        return res.status(201).json({
            ok: true,
            noticia: newNoticia
        });
    });
});

app.get('/',(req,res)=>{
    Noticia.find()
        .exec((err,noticias)=>{
            if (err){
                return res.status(400).json({
                    ok: false,
                    msj: err
                });
            }
            return res.status(200).json(noticias)
        })
});

app.put('/:id',mdVerificaToken.verificaToken,(req,res)=>{
    console.log(req.body);
    Noticia.findOneAndUpdate({_id:req.params.id},
        req.body,
        {new: true},
        (err, noticia_nueva)=>{
            if (err) res.status(400).json(err)
            res.status(200).json({noticia:noticia_nueva, ok:true})
        })
});
module.exports = app;
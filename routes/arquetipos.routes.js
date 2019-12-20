let express = require('express');

let app = express();

let Arquetipos = require('../models/arquetipo.model'); //llamado del modelo arquetipos



//Busqueda de los datos del paciente
app.get('/',(req,res) => {
    Arquetipos.find()
        .exec((err,arquetipo)=>{
            if(err) res.send(500,err);
            res.status(200).json(arquetipo);
        })
});

//Guardado en DB
app.post('/',(req,res)=>{
    let body = req.body
    let Arquetipo = new Arquetipos({
        nombre:body.nombre,
        campos: body.campos,
    })
    Arquetipo.save((err, newArquetipo)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err: err,
                msj: 'Error en el arquetipo'
            });
        }
        return res.status(201).json({
            ok: true,
            arquetipo: newArquetipo
        })
    })
})

//busqueda 
app.get('/:id',(req,res)=>{
    Arquetipos.findOne({_id:req.params.id})
        .exec((err,arquetipo)=>{
            if (err){
                return res.status(400).json({
                    ok: false,
                    msj: err
                });
            }
            return res.status(200).json(arquetipo)
        })
});
module.exports = app;
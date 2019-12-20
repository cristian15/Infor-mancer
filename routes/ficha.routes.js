let express = require('express');

let app = express();

let Ficha = require('../models/ficha.model'); //llamado del modelo ficha
let Paciente = require('../models/paciente.model');//llamado del modelo paciente
let mdVerificaToken = require('../middlewares/auth');//middleware de autenticacion (seguridad)


//Busqueda de los datos de la ficha
app.get('/',mdVerificaToken.verificaToken,(req,res) => {
    Ficha.find()
        .populate({path:'paciente', model: Paciente})
        .exec((err,fichas)=>{
            if(err) res.send(500,err);
            res.status(200).json(fichas);
        })
});

//Guardado en DB
app.post('/',mdVerificaToken.verificaToken,(req,res)=>{
    let body = req.body
    console.log(body);
    let ficha = new Ficha({
        folio:body.folio,
        paciente: body.paciente,
        fecha_ingreso:body.fecha_ingreso,
        arquetipos: body.arquetipos,
        last_update: body.last_update
    });
    ficha.save((err, newFicha)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        return res.status(201).json({
            ok: true,
            ficha: newFicha
        })
    })
});

app.post('/paciente',mdVerificaToken.verificaToken,(req,res)=>{
    let body = req.body
    let paciente = new Paciente({
        nombre: body.nombre,
        rut: body.rut,
        fecha_nacimiento: body.fecha_nacimiento,
        genero: body.genero,
        direccion: body.direccion,
        prevision: body.prevision,
        grupo_sangre: body.grupo_sangre,
        estatura_paciente: body.estatura_paciente,
        fono: body.fono,
        rh: body.rh
    })
    paciente.save((err, newPaciente)=>{
        if (err){
            return res.status(400).json({
                ok: false,
                err: err
            });
        }
        return res.status(201).json({
            ok: true,
            paciente: newPaciente
        })
    })
});

app.put('/:id',mdVerificaToken.verificaToken,(req,res)=>{
    let ficha_new = req.body
    ficha_new.last_update = new Date();
    Ficha.findOneAndUpdate({_id:req.params.id},
        ficha_new,
        {new: true},
        (err, fichanueva)=>{
            if (err) res.status(400).json(err)
            res.status(200).json(fichanueva)
        })
});
app.post('/fichas',mdVerificaToken.verificaToken,(req,res)=>{
    let fichas = req.body.fichas
    for(let f of fichas){
        Ficha.findOne({'_id': f._id})
        .exec((err,ficha)=>{
            if (err){res.status(400).json({err:err})}
            if(new Date(ficha.last_update)<new Date(f.last_update)){        // actualiza si hubieron cambios (ultima actualizacion)
                console.log("Actrualiza!!!!!", f._id); 
                ficha.last_update = f.last_update;
                ficha.arquetipos = f.arquetipos;
                ficha.save((erro, newficha)=>{
                    if (erro){
                        return res.status(400).json({
                            ok: false,
                            err: err
                        });
                    }
                    return res.status(201).json({
                        ok: true,
                        paciente: newficha
                    })
                });
            }
        })
    }
});

//busqueda paciente
app.get('/paciente/:id',mdVerificaToken.verificaToken,(req,res)=>{
    Ficha.findOne({'paciente':req.params.id})
    .populate({path:'paciente',model:Paciente})
    .exec((err,ficha)=>{
        if (err){res.status(400).json({err:err})}
        res.status(200).json(ficha)
    })  
});
//busqueda ficha
app.get('/folio/:folio',mdVerificaToken.verificaToken,(req,res)=>{
    Ficha.findOne({folio:req.params.folio})
        .populate( {path:'paciente',model:Paciente})
        .exec((err,ficha)=>{
            if (err){res.status(400).json({err:err})}
            res.status(200).json(ficha)
        })
});
app.get('/rut/:rut',mdVerificaToken.verificaToken,(req,res)=>{
    Ficha.find()
        .populate( {path:'paciente',model:Paciente})
        .exec((err,fichas)=>{
            if (err){res.status(400).json({err:err})}
            let ficha = fichas.filter(f =>f.paciente.rut == req.params.rut);                        
            res.status(200).jsonp(ficha[0])            
        })
});


module.exports = app;

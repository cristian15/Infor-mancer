let express = require('express');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');          // carga la libreria del JSON Web Token de Auth0
let config = require('../config/config');       // carga el archivo de configuracion

let app = express();

let Usuario = require('../models/usuario.model');
let mdVerificaToken = require('../middlewares/auth');


// Nuevo Usuario
app.post('/', (req, res) => {
    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
    });
    usuario.save((err, newUsuario) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msj: 'Error al crear usuario',
                errors: err
            });
        }
        newUsuario.password = null;
        return res.status(201).json({
            ok: true,
            usuario: newUsuario
        });
    });
});
// Comprueba password de usuario
app.post('/confirmar_password',mdVerificaToken.verificaToken , (req, res) => {
    Usuario.findById(req.usuario._id, (err, usuario)=>{     // busca el usuario para compara la contraseña con la enviada por el cliente
        if(err) res.status(400).jsonp({ok: false, mensaje: err});  
        return res.status(200).jsonp(bcrypt.compareSync(req.body.password, usuario.password))   // envia la respuesta de comparar la contraseña del usuario con la que envio el cliente, devuelve true si coinciden, false en caso contrario
    });
});
// Comprueba password de usuario
app.post('/cambia_password',mdVerificaToken.verificaToken , (req, res) => {
    let newUsuario = {      // crea un nuevo usuario para ejecutar los cambios
        password: bcrypt.hashSync(req.body.password, 10)    // encripta nueva password
    };
    Usuario.findOneAndUpdate({_id: req.usuario._id},    // busca el usuario por el id recibido de la validacion del token
        newUsuario, // datos del usuario por actualizar
        (err, usuario)=>{   // callback del metodo 
            if(err) res.status(500).jsonp({ok:false, mensaje: 'Error al Actualizar Usuario', errors: err});
            res.status(200).jsonp({ok: true}); // si todo esta OK devuelve el nuevo objeto al cliente
    });
});

// Actualizar Usuario
app.put('/', mdVerificaToken.verificaToken, (req, res) => {
    let newUsuario = {      // crea un nuevo usuario para ejecutar los cambios
        nombre: req.body.nombre,
        token2FA: req.body.token2FA,
        Activo2FA: req.body.Activo2FA,
        activo: req.body.activo,
        roles: req.body.roles
    };
    Usuario.findOneAndUpdate({_id: req.body._id},    // busca el usuario por el id recibido de la validacion del token
        newUsuario,         // datos del usuario por actualizar
        {new: true},        // para devolver el usaurio modificado o no
        (err, usuario)=>{   // callback del metodo 

            if(err) res.status(500).jsonp({ok:false, mensaje: 'Error al Actualizar Usuario', errors: err});
            usuario.password = null;    // cambia la contraseña para no devolverla al cliente
            let token = jwt.sign({usuario: usuario}, config.SEEDJWT, {expiresIn: 14400});   // genera el token con la clave desde el archivo config. dentro del token esta el objeto de usuario con su informacion con una vigencia de 4 hrs
            res.status(200).jsonp({ok: true, usuario: usuario, token: token}); // si todo esta OK devuelve el nuevo objeto al cliente
    });
});
// Obtiene todos los Usuarios
app.get('/', mdVerificaToken.verificaToken, (req, res) => {    
    Usuario.find({}, 'nombre email img roles Activo2FA activo') // que datos del usuario devolver de la consulta
        .exec(
            (err, usuarios) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        msj: 'Error al consultar usuarios',
                        errors: err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            }
        );
});



module.exports = app;
let express = require('express');
let bcrypt = require('bcryptjs');           // libreria para comparar y encriptar las contraseñas
let jwt = require('jsonwebtoken');          // carga la libreria del JSON Web Token de Auth0
let config = require('../config/config');       // carga el archivo de configuracion

var speakeasy = require('speakeasy');       // libreria para generar y verificar el token de 2FA
let mdVerificaToken = require('../middlewares/auth');

let app = express();

let Usuario = require('../models/usuario.model');

app.post('/', (req, res) => {       // Solicitud POST de la ruta para iniciar sesion
    let body = req.body;
    Usuario.findOne({ email: body.email }, (err, usuario) => {      // busca un usuario por el email recibido de la consulta
        if (err) {      // si la consulta a la BD genera algun error
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {  // si no existe un usuario con ese email
            return res.status(400).json({
                ok: false,
                mensaje: 'Usuario no existe',
            });
        }

        if(!usuario.activo){
            return res.status(400).jsonp({
                ok: false,
                mensaje: 'Usuario No Habilitado!!'
            });
        }

        if (!bcrypt.compareSync(body.password, usuario.password)) {  // si la contraseña encriptada de la BD no coincide con la recibida desde la consulta
            return res.status(400).json({
                ok: false,
                mensaje: 'Contraseña incorrecta',
            });
        }
        usuario.password = null;        // si la contraseña es correcta la quita del objeto para no enviarla al cliente en el objeto del usuario
        // Crear Token  14400seg = 4horas
        let token = jwt.sign({usuario: usuario}, config.SEEDJWT, {expiresIn: 14400});   // genera el token con la clave desde el archivo config. dentro del token esta el objeto de usuario con su informacion con una vigencia de 4 hrs

        return res.status(200).json({   //  envia al cliente el objeto con el token y el usuario
            ok: true,
            usuario: usuario,
            token: token,
            id: usuario.id
        });
    });
});

// Metodo que devuelve el token de autorizacion de 2 factores, para ingresarlo al usuario
app.get('/2fa', mdVerificaToken.verificaToken, (req, res)=>{
    var secret = speakeasy.generateSecret({length: 20});        // genera el token 2FA
    res.status(200).jsonp({token2FA: secret.base32, url:secret.otpauth_url});           // envia al cliente el token 2FA 
});

// metodo para comprobar que la clave de autenticador coincide con el token
app.post('/2fa', (req, res)=>{
    var verified = speakeasy.totp.verify({  // metodo para verificar el token con el codigo fisico, devuelve True o False
        secret: req.body.token2FA,   // token 2FA del usuario recibido del token y DB
        encoding: 'base32',             // metodo de encriptacion
        token: req.body.codigo2FA       // codigo fisico del telefono del cliente para verificar 
    });
    res.status(200).jsonp({verificado: verified});  // devuelve al cliente la verificacion del codigo 2FA
});

module.exports = app;
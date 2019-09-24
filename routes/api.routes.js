let express = require('express');

const usuarioRoutes = require('./usuario.routes');
const loginRoutes = require('./login.routes');
const ficharoutes = require('./ficha.routes');
const arquetiposRoutes = require('./arquetipos.routes');


let app = express();

app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/ficha', ficharoutes);
app.use('/arquetipos', arquetiposRoutes);

module.exports = app;

// **configurando a aplicação express**

const express = require ('express');
const bodyParser = require ('body-parser');
const config = require ('config');
const consign = require("consign");
module.exports = () => {
    const app = express();

// setando variaveis de aplicação
app.set('port', process.env.PORT || config.get ('server.port'));

// middlesWares
app.use(bodyParser.json());

//importar rota
//require('../api/routes/customerWallets')(app);

//endpoints
consign({cwd: 'api'})
    .then('data')
    .then('controllers')
    .then('routes')
    .into(app)

return app;

};
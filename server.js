//      iniciador do servidor 
const app = require('./config/express')();
const port = app.get('port');

// Rodando a aplicação na porta setada

app.listen(port, () =>{
    console.log('Servidor rodando na porta '+ port)

})
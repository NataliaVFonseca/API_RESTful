const { json } = require("body-parser");
const req = require("express/lib/request");

//configurando o controller da rota
const controller = {};

// Importando a base de dados construída em um mock com base em um arquivo JSON
module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;

// API de consulta ao banco de dados dos clientes
    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

// API de criação de clientes
    controller.createCustomerWallets = (req, res) => {
        const {name, birthDate, cellphone, phone, email, occupation, state, city, balance} = req.body;  // Leitura dos dados de entrada
        const id = generateUUID(); // geração de ID único
        const parentId = generateUUID(); // geração de ID único
        const createdAt = new Date(); // atualização da data de edição
        checkRequired(req.body); // checar campos obrigatórios

        let dataBase = customerWalletsDB.customerWallets.data; // leitura do banco de dados

       checkEmailExists(email, dataBase); // verificação se o cliente já existe com base em seu email

        const customer = { // criação do cliente na estrutura do banco de dados
          "id": id,
          "name": name,
          "parentId": parentId,
          "birthDate": birthDate,
          "cellphone": cellphone,
          "phone": phone,
          "email": email,
          "occupation": occupation,
          "state": state,
          "city": city,
          "balance": balance,
          "createdAt": createdAt
        }
        
        dataBase.push(customer); // inserção do cliente criado no vetor de clientes

        res.status(201).json(dataBase); // resposta da API com status de sucesso
    };

//API de edição do cliente
    controller.editCustomerWallets = (req, res) => {

        const {name, birthDate, cellphone, phone, email, occupation, state, city, balance} = req.body;
        const id = generateUUID();
        const parentId = generateUUID();
        const createdAt = new Date();
        
       const customer = {
        "id": id,
        "name": name,
        "parentId": parentId,
        "birthDate": birthDate,
        "cellphone": cellphone,
        "phone": phone,
        "email": email,
        "occupation": occupation,
        "state": state,
        "city": city,
        "balance": balance,
        "createdAt": createdAt

    }
    let dataBase = customerWalletsDB.customerWallets.data;
    editDB(dataBase, customer);
    res.status(202).json(dataBase);
}

// API de Exclusão de Clientes
    controller.deleteCustomerWallets = (req,res) =>{
        let email = req.body;

        let costumer = email

    let dataBase = customerWalletsDB.customerWallets.data;
    deleteDB(dataBase,costumer);
    res.status(203).json(dataBase);
    };

// API de contagem de clientes cadastrados

    controller.contCustomerWallets = (req, res) => res.status(204).json(customerWalletsDB.length);

    return controller;
}

// Criação de Identificador Unico
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

//Função para verificar o preenchimento de campos obrigatórios
function checkRequired(input){
    // input = JSON.stringify(input);
    
    if(!input.city){
        throw("Field city is required");
        
    }
}

// Verificação de email existente
function checkEmailExists(mail, db){
    // db.push("a");
    // throw("teste "+ JSON.stringify(db));

   if( db.some(elem => elem.email === mail)){
   
        throw("This mail already exists!");
    }

}
// Condição de edição
function editDB(db, customer){
    let index = db.findIndex(elem => elem.email === customer.email)

    if( index < 0){

      throw("This mail no exists!");

    }
    else {
         db[index] = customer;
    }

}

function deleteDB(db, customer){
    let index = db.findIndex(elem => elem.email === customer.email)

    if( index < 0){

    throw("This mail no exists!" + JSON.stringify(customer));

    }
    else {
        //throw("teste")
        db.splice(index, 1);
    }


}

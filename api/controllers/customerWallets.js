
//configurando o controller da rota

const { json } = require("body-parser");

module.exports = app => {
    const customerWalletsDB = app.data.customerWallets;
    const controller = {};

    controller.listCustomerWallets = (req, res) => res.status(200).json(customerWalletsDB);

    controller.createCustomerWallets = (req, res) => {
        const {name, birthDate, cellphone, phone, email, occupation, state, city, balance} = req.body;
        const id = generateUUID();
        const parentId = generateUUID();
        const createdAt = new Date();
        checkRequired(req.body);

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
        // throw ("Teste" + JSON.stringify(customer)); 
        let dataBase = customerWalletsDB.customerWallets.data;
        dataBase.push(customer);

        res.status(201).json(dataBase);
    };

    return controller;

}

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

function checkRequired(input){
    // input = JSON.stringify(input);
    
    if(!input.city){
        throw("Field city is required");
        
    }
}

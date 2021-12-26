//configurando a rota

module.exports = (app) => {
    const controller = app.controllers.customerWallets;

    app.route('/api/v1/customer-wallets').get(controller.listCustomerWallets); //Rota de  consuta ao banco de clientes

    app.route('/api/v1/customer-wallets').post(controller.createCustomerWallets); // Rota de inserção de clientes 

    app.route('/api/v1/customer-wallets').patch(controller.editCustomerWallets); // Rota de edição de clientes 

    app.route('/api/v1/customer-wallets').delete(controller.deleteCustomerWallets); // Rota de exclusão de clientes
    
    app.route('/api/v2/customer-wallets').get(controller.contCustomerWallets); //Rota para contar o nnumero de  clientes cadastrados no banco
}
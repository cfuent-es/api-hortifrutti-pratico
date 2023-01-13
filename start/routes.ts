import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async() => {
    return {
        hortifrutti: "prático"
    }
});

Route.post('/login', "AuthController.login")

Route.group(() => {
    Route.get('/me', "AuthController.me")
    Route.post('/logout', "AuthController.logout")

    Route.put('/clients/update', "ClientsController.update")
}).middleware('auth')

Route.post("/clients/register", "ClientsController.store")

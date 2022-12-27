import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Route from '@ioc:Adonis/Core/Route'
import User from 'App/Models/User'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/create-admin', async () => {
  User.create({
    email: 'admin@admin.com',
    password: 'admin',
    type: 'admin'
  })
})

Route.post('/gettoken', async ({ request, response, auth }: HttpContextContract) => {
  const email = request.input('email')
  const password = request.input('password')

  const user = await User.find('email', email)

  if(user == null) {
    return response.notFound("User not found")
  }

  const token = await auth.use('api').attempt(email, password)

  return response.ok(token);
})

Route.get('/auth', async ({ response, auth }: HttpContextContract) => {
  response.ok("somente usuários autenticados podem ver essa mensagem")
}).middleware('auth')

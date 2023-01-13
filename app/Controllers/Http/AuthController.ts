import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Admin from 'App/Models/Admin'
import Client from 'App/Models/Client'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export default class AuthController {
  public async login({auth, request, response}: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.findByOrFail("email", email)
      let expiresAt

      switch (user.type) {
        case "client":
          expiresAt = "30 days"
          break;

        case "store":
          expiresAt = "7 days"
          break;

        case "admin":
          expiresAt = "1 day"
          break;

        default:
          expiresAt = "30 days"
          break;
      }

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: expiresAt,
        name: user?.serialize().email
      })

      response.ok(token)

    } catch (error) {
      return response.badRequest("Invalid Credentials")
    }
  }

  public async logout({auth, response}: HttpContextContract) {
    try {
      await auth.use("api").revoke()
    } catch (error) {
      return response.unauthorized("You are not logged in")
    }
    response.ok({
      revoked: true
    })
  }

  public async me({auth, response}: HttpContextContract) {
    const user = await auth.use("api").authenticate()

    let data: any;
    switch (user.type) {
      case "client":
        const client = await Client.findByOrFail("user_id", user.id)
        data = {
          clientId: client.id,
          clientName: client.name,
          clientEmail: user.email,
          clientPhone: client.phone,
        }
        break;

      case "store":
        const store = await Store.findByOrFail("user_id", user.id)
        data = {
          storeId: store.id,
          storeName: store.name,
          storeEmail: user.email,
          storeLogo: store.logo,
          storeActive: store.active,
          storeOnline: store.online,
        }
        break;

      case "admin":
        const admin = await Admin.findByOrFail("user_id", user.id)
        data = {
          adminId: admin.id,
          adminName: admin.name,
          adminEmail: user.email,
        }
        break;

      default:
        response.badRequest("Invalid user type")
    }
    response.ok(data)
  }
}

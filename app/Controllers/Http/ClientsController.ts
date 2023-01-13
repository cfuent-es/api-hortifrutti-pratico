import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from 'App/Models/User'
import Client from 'App/Models/Client'
import ClientCreateValidator from 'App/Validators/ClientCreateValidator'
import ClientEditValidator from 'App/Validators/ClientEditValidator';
import Database from '@ioc:Adonis/Lucid/Database';

export default class ClientsController {
  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ClientCreateValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
      type: 'client'
    });

    const client = await Client.create({
      name: payload.name,
      phone: payload.phone,
      user_id: user.id
    });

    return response.ok({
      id: client.id,
      name: client.name,
      phone: client.phone,
      email: user.email

    })
  }

  public async update({ request, response, auth }: HttpContextContract) {
    const payload = await request.validate(ClientEditValidator);

    const userAuth = await auth.use('api').authenticate();

    const trx = await Database.transaction();

    try {
      const user = await User.findByOrFail('id', userAuth.id);
      const client = await Client.findByOrFail('user_id', userAuth.id);

      if(payload.password) {
        user.merge({
          email: payload.email,
          password: payload.password
        })
      } else {
        user.merge({
          email: payload.email
        })
      }

      await user.save()

      client.merge({
        name: payload.name,
        phone: payload.phone
      })

      await client.save()

      await trx.commit()

      return response.ok({
        id: client.id,
        name: client.name,
        phone: client.phone,
        email: user.email
      })
    }
    catch (error) {
      await trx.rollback()
      return response.badRequest("Erro ao atualizar os dados do cliente")
    }
  }
}

import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Client from 'App/Models/Client'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'client@email.com',
      password: '123456',
      type: 'client'
    })

    await Client.create({
      userId: user.id,
      name: 'Client Name',
      phone: '11 9 9999-9999',
    })

  }
}

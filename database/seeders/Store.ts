import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Store from 'App/Models/Store'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'store@email.com',
      password: '123456',
      type: 'store'
    })

    await Store.create({
      userId: user.id,
      name: 'Store Name',
      logo: 'logo.png',
      active: true,
      online: true,
    })


  }
}

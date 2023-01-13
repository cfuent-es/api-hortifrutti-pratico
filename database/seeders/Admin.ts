import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import Admin from 'App/Models/Admin'

export default class extends BaseSeeder {
  public async run () {
    const user = await User.create({
      email: 'admin@email.com',
      password: '123456',
      type: 'admin'
    })

    await Admin.create({
      userId: user.id,
      name: 'Admin Name',
    })
  }
}

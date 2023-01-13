import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class CitiesStores extends BaseModel {
  @column({ isPrimary: true })
  public cityId: number

  @column({ isPrimary: true })
  public storeId: number

  @column()
  public deliveryFee: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

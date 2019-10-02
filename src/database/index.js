import Sequelize from 'sequelize'
import databaseConfig from '../config/database'

import User from '../app/models/User'
import File from '../app/models/File'
import PersonalData from '../app/models/PersonalData.js'
import BankData from '../app/models/BankData.js'
import Contacts from '../app/models/Contacts.js'
import Documents from '../app/models/Documents.js'
import Partners from '../app/models/Partners.js'
import SocialMedia from '../app/models/SocialMedia.js'
import Tag from '../app/models/Tag.js'
import Avaliation from '../app/models/Avaliation.js'

const models = [User, File, PersonalData, BankData, Contacts, Documents, Partners, SocialMedia, Tag, Avaliation]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(databaseConfig)

    models.map(model => model.init(this.connection)).map(model => model.associate && model.associate(this.connection.models))
  }
}

export default new Database()

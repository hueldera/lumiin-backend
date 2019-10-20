import faker from 'faker'
import { factory } from 'factory-girl'
import User from '../src/app/models/User'
import roles from '../src/config/roles'

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  role: roles.MANAGER
})

export default factory

import request from 'supertest'
import app from '../../src/app'
import roles from '../../src/config/roles'
import factory from '../factories'

describe('User', () => {
  it('should be able to be invited', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    const response = await request(app)
      .post('/initialusers')
      .send({ ...user })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to get JWT', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    const response = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    expect(response.body).toHaveProperty('token')
  })
})

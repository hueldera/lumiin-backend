import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'

describe('BankData', () => {
  beforeAll(async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    const userRegistered = await request(app)
      .post('/initialusers')
      .send({ ...user })
    const userID = userRegistered.body.id
  })

  it('should be able to store bank data', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    await request(app)
      .post('/initialusers')
      .send({ ...user })

    const userResponse = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const bankData = {
      cpf: '48371574835',
      holder: 'test',
      account: 'test',
      bank_branch: 'test',
      bank: 'nubank'
    }
    const authStr = 'Bearer ' + userResponse.body.token
    const response = await request(app)
      .post('/bankData')
      .set('Authorization', authStr)
      .send({ ...bankData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list bank data', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    await request(app)
      .post('/initialusers')
      .send({ ...user })

    const userResponse = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const authStr = 'Bearer ' + userResponse.body.token

    const response = await request(app)
      .get('/bankData')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single bank data', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    //const userRegistered = await request(app)
    //.post('/initialusers')
    //.send({ ...user })
    //const userID = userRegistered.body.id

    const userResponse = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const authStr = 'Bearer ' + userResponse.body.token

    const response = await request(app)
      .get(`/bankData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body)
  })

  it('should be able to update bank data', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    const userRegistered = await request(app)
      .post('/initialusers')
      .send({ ...user })
    const userID = userRegistered.body.id

    const userResponse = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const bankData = {
      cpf: '48371574835',
      holder: 'testModified',
      account: 'testModified',
      bank_branch: 'testModified',
      bank: 'nubankModified'
    }
    const authStr = 'Bearer ' + userResponse.body.token
    const response = await request(app)
      .put(`/bankData/${userID}`)
      .set('Authorization', authStr)
      .send({ ...bankData })

    console.log('updateee', response.body, userRegistered)

    expect(response.body)
  })

  it('should be able to delete a single bank data', async () => {
    const user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    const userRegistered = await request(app)
      .post('/initialusers')
      .send({ ...user })
    const userID = userRegistered.body.id

    const userResponse = await request(app)
      .post('/sessions')
      .send({ email: user.email, password: user.password })

    const authStr = 'Bearer ' + userResponse.body.token

    const response = await request(app)
      .delete(`/bankData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body)
  })
})

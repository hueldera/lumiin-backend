import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('BankData', () => {
  let userID = 0
  let token = ''
  beforeEach(async () => {
    await truncate()
    let userRegistered
    let userToken
    let user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    userRegistered = await request(app)
      .post('/initialusers')
      .send({ ...user })

    userID = userRegistered.body.id

    userToken = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password
      })

    token = userToken.body.token
  })

  it('should be able to store bank data', async () => {
    const authStr = 'Bearer ' + token
    const bankData = {
      cpf: '48371574835',
      holder: 'test',
      account: 'test',
      bank_branch: 'test',
      bank: 'nubank'
    }
    const response = await request(app)
      .post('/bankData')
      .set('Authorization', authStr)
      .send({ ...bankData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list bank data', async () => {
    const authStr = 'Bearer ' + token

    const bankData = {
      cpf: '48371574835',
      holder: 'test',
      account: 'test',
      bank_branch: 'test',
      bank: 'nubank'
    }
    await request(app)
      .post('/bankData')
      .set('Authorization', authStr)
      .send({ ...bankData })

    const response = await request(app)
      .get('/bankData')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single bank data', async () => {
    const authStr = 'Bearer ' + token

    const bankData = {
      cpf: '48371574835',
      holder: 'test',
      account: 'test',
      bank_branch: 'test',
      bank: 'nubank'
    }
    await request(app)
      .post('/bankData')
      .set('Authorization', authStr)
      .send({ ...bankData })

    const response = await request(app)
      .get(`/bankData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update bank data', async () => {
    const authStr = 'Bearer ' + token

    const initialBankData = {
      cpf: '48371574835',
      holder: 'test',
      account: 'test',
      bank_branch: 'test',
      bank: 'nubank'
    }
    await request(app)
      .post('/bankData')
      .set('Authorization', authStr)
      .send({ ...initialBankData })

    const bankData = {
      cpf: '48371574835',
      holder: 'testModified',
      account: 'testModified',
      bank_branch: 'testModified',
      bank: 'nubankModified'
    }

    const response = await request(app)
      .put(`/bankData/${userID}`)
      .set('Authorization', authStr)
      .send({ ...bankData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single bank data', async () => {
    const authStr = 'Bearer ' + token

    const bankData = {
      cpf: '48371574835',
      holder: 'test',
      account: 'test',
      bank_branch: 'test',
      bank: 'nubank'
    }
    await request(app)
      .post('/bankData')
      .set('Authorization', authStr)
      .send({ ...bankData })

    const response = await request(app)
      .delete(`/bankData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

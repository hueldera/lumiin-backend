import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'

let userID = 0

describe('Personal Data', () => {
  beforeEach(async () => {
    let userRegistered
    let user = await factory.attrs('User', {
      role: roles.MANAGER
    })

    userRegistered = await request(app)
      .post('/initialusers')
      .send({ ...user })

    userID = userRegistered.body.id
  })

  it('should be able to store personal data', async () => {
    const personalData = {
     name: 'test',
     birth_date: 17/12/2201,
     cpf_cnpj: '48371574835',
     rg: '565912855',
     street: 'rua flores',
     house_number: 12,
     house_complement: '',
     neighborhood: 'bairro progresso',
     city: 'sumare',
     state: 'sao paulo',
     country: 'brasil',
     state_subscription: 32,
     civic_subscription: 321,
    }

    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .post('/personalData')
      .set('Authorization', authStr)
      .send({ ...personalData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list personal data', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get('/personalData')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single personal data', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get(`/personalData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update personal data', async () => {
    const personalData = {
     name: 'test modified',
     birth_date: 17/12/2201,
     cpf_cnpj: '48371574835',
     rg: '565912855',
     street: 'rua flores',
     house_number: 12,
     house_complement: '',
     neighborhood: 'bairro progresso',
     city: 'sumare',
     state: 'sao paulo',
     country: 'brasil',
     state_subscription: 32,
     civic_subscription: 321,
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .put(`/personalData/${userID}`)
      .set('Authorization', authStr)
      .send({ ...personalData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single personal data', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .delete(`/personalData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })
})

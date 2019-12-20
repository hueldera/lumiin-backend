import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('Personal Data', () => {
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

  it('should be able to store personal data', async () => {
    const personalData = {
      name: 'test',
      birth_date: '12/01/2003',
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
      civic_subscription: 321
    }

    const authStr = 'Bearer ' + token
    const response = await request(app)
      .post('/personalData')
      .set('Authorization', authStr)
      .send({ ...personalData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list personal data', async () => {
    const personalData = {
      name: 'test',
      birth_date: '12/01/2003',
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
      civic_subscription: 321
    }
    const authStr = 'Bearer ' + token

    await request(app)
      .post('/personalData')
      .set('Authorization', authStr)
      .send({ ...personalData })

    const response = await request(app)
      .get('/personalData')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single personal data', async () => {
    const authStr = 'Bearer ' + token
    const personalData = {
      name: 'test',
      birth_date: '12/01/2003',
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
      civic_subscription: 321
    }

    await request(app)
      .post('/personalData')
      .set('Authorization', authStr)
      .send({ ...personalData })

    const response = await request(app)
      .get(`/personalData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update personal data', async () => {
    const initialData = {
      name: 'test',
      birth_date: '12/01/2003',
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
      user_id: userID
    }

    const updatedData = {
      name: 'test modified',
      birth_date: '12/01/2003',
      cpf_cnpj: '48371574835',
      rg: '565912855',
      street: 'rua flores',
      house_number: 12,
      house_complement: 'fundos',
      neighborhood: 'bairro progresso',
      city: 'sumare',
      state: 'sao paulo',
      country: 'brasil',
      state_subscription: 32,
      civic_subscription: 321
    }
    const authStr = 'Bearer ' + token
    await request(app)
      .post('/personalData')
      .set('Authorization', authStr)
      .send({ ...initialData })

    const response = await request(app)
      .put(`/personalData/${userID}`)
      .set('Authorization', authStr)
      .send({ ...updatedData })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single personal data', async () => {
    const authStr = 'Bearer ' + token
    const personalData = {
      name: 'test',
      birth_date: '12/01/2003',
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
      civic_subscription: 321
    }

    await request(app)
      .post('/personalData')
      .set('Authorization', authStr)
      .send({ ...personalData })

    const response = await request(app)
      .delete(`/personalData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

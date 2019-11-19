import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('Contacts', () => {
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

  it('should be able to store contacts', async () => {
    const authStr = 'Bearer ' + token
    const contact = {
      email: 'teste@teste.com',
      phone: 19974154036,
      cellphone: 19974154036
    }
    const response = await request(app)
      .post('/contacts')
      .set('Authorization', authStr)
      .send(contact)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list contacts', async () => {
    const authStr = 'Bearer ' + token
    const contact = {
      email: 'teste@teste.com',
      phone: 19974154036,
      cellphone: 19974154036
    }

    await request(app)
      .post('/contacts')
      .set('Authorization', authStr)
      .send({ ...contact })

    const response = await request(app)
      .get('/contacts')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single contact', async () => {
    const authStr = 'Bearer ' + token

    const contact = {
      email: 'teste@teste.com',
      phone: 19974154036,
      cellphone: 19974154036
    }

    await request(app)
      .post('/contacts')
      .set('Authorization', authStr)
      .send({ ...contact })

    const response = await request(app)
      .get(`/contacts/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update contact', async () => {
    const authStr = 'Bearer ' + token
    const initialContact = {
      email: 'teste@teste.com',
      phone: 19974154036,
      cellphone: 19974154036
    }

    await request(app)
      .post('/contacts')
      .set('Authorization', authStr)
      .send({ ...initialContact })

    const contact = {
      email: 'teste_modified@teste.com',
      phone: 19974312312,
      cellphone: 19974312312
    }

    const response = await request(app)
      .put(`/contacts/${userID}`)
      .set('Authorization', authStr)
      .send({ ...contact })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single contact', async () => {
    const authStr = 'Bearer ' + token

    const contact = {
      email: 'teste@teste.com',
      phone: 19974154036,
      cellphone: 19974154036
    }

    await request(app)
      .post('/contacts')
      .set('Authorization', authStr)
      .send({ ...contact })

    const response = await request(app)
      .delete(`/contacts/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

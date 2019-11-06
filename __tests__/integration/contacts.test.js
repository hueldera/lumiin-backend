import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'

let userID = 0

describe('Contacts', () => {
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

  it('should be able to store contacts', async () => {
    const contact = {
      email: 'teste@teste.com',
      phone: 19974154036,
      cellphone: 19974154036,
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .post('/contacts')
      .set('Authorization', authStr)
      .send({ ...contact })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list contacts', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get('/contacts')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single contact', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get(`/bankData/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update contact', async () => {
    const contact = {
      email: 'teste_modified@teste.com',
      phone: 19974312312,
      cellphone: 19974312312,
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .put(`/contacts/${userID}`)
      .set('Authorization', authStr)
      .send({ ...contact })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single contact', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .delete(`/contacts/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })
})

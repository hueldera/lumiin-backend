import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'

let userID = 0

describe('Partners', () => {
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

  it('should be able to store partners', async () => {
    const partners = {
      personalData: 1231231,
      contacts: 4143423,
      documents: 123213123
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .post('/partners')
      .set('Authorization', authStr)
      .send({ ...partners })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list partners', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get('/partners')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single partner', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get(`/partners/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update partner', async () => {
    const partners = {
      personalData: 43242343,
      contacts: 54353454,
      documents: 434243243
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .put(`/partners/${userID}`)
      .set('Authorization', authStr)
      .send({ ...partners })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single partner', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .delete(`/partners/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })
})

import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('Partners', () => {
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

  it('should be able to store partners', async () => {
    const authStr = 'Bearer ' + token

    const partners = {
      personalData: 1,
      contacts: 1,
      documents: 1
    }
    const response = await request(app)
      .post('/partners')
      .set('Authorization', authStr)
      .send({ ...partners })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list partners', async () => {
    const authStr = 'Bearer ' + token

    const partners = {
      personalData: 1,
      contacts: 1,
      documents: 1
    }

    console.log('aquiiiiiiiiiii', personalData.body)

    await request(app)
      .post('/partners')
      .set('Authorization', authStr)
      .send({ ...partners })

    const response = await request(app)
      .get('/partners')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single partner', async () => {
    const authStr = 'Bearer ' + token

    const partners = {
      personalData: 1,
      contacts: 1,
      documents: 1
    }

    await request(app)
      .post('/partners')
      .set('Authorization', authStr)
      .send({ ...partners })

    const response = await request(app)
      .get(`/partners/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update partner', async () => {
    const authStr = 'Bearer ' + token

    const initialPartners = {
      personalData: 1,
      contacts: 1,
      documents: 1
    }

    await request(app)
      .post('/partners')
      .set('Authorization', authStr)
      .send({ ...initialPartners })

    const partners = {
      personalData: 1,
      contacts: 1,
      documents: 1
    }
    const response = await request(app)
      .put(`/partners/${userID}`)
      .set('Authorization', authStr)
      .send({ ...partners })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single partner', async () => {
    const authStr = 'Bearer ' + token

    const partners = {
      personalData: 1,
      contacts: 1,
      documents: 1
    }

    await request(app)
      .post('/partners')
      .set('Authorization', authStr)
      .send({ ...partners })

    const response = await request(app)
      .delete(`/partners/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

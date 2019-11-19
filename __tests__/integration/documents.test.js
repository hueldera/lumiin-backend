import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('Documents', () => {
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

  it('should be able to store documents', async () => {
    const authStr = 'Bearer ' + token
    const documents = {
      document: 'testeteste',
      photo: 'photo photo'
    }
    const response = await request(app)
      .post('/documents')
      .set('Authorization', authStr)
      .send({ ...documents })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list documents', async () => {
    const authStr = 'Bearer ' + token
    const documents = {
      document: 'testeteste',
      photo: 'photo photo'
    }

    await request(app)
      .post('/documents')
      .set('Authorization', authStr)
      .send({ ...documents })

    const response = await request(app)
      .get('/documents')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single document', async () => {
    const authStr = 'Bearer ' + token
    const documents = {
      document: 'testeteste',
      photo: 'photo photo'
    }

    await request(app)
      .post('/documents')
      .set('Authorization', authStr)
      .send({ ...documents })

    const response = await request(app)
      .get(`/documents/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update documents', async () => {
    const authStr = 'Bearer ' + token
    const initialDocuments = {
      document: 'testeteste',
      photo: 'photo photo'
    }
    const documents = {
      document: 'testeteste',
      photo: 'photo photo'
    }

    await request(app)
      .post('/documents')
      .set('Authorization', authStr)
      .send({ ...initialDocuments })

    const response = await request(app)
      .put(`/documents/${userID}`)
      .set('Authorization', authStr)
      .send({ ...documents })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single document', async () => {
    const authStr = 'Bearer ' + token
    const documents = {
      document: 'testeteste',
      photo: 'photo photo'
    }

    await request(app)
      .post('/documents')
      .set('Authorization', authStr)
      .send({ ...documents })

    const response = await request(app)
      .delete(`/documents/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

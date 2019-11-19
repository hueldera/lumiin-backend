import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('Tag', () => {
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

  it('should be able to store tag', async () => {
    const authStr = 'Bearer ' + token

    const tag = {
      note: 10,
      comment: 'test'
    }

    const response = await request(app)
      .post('/tag')
      .set('Authorization', authStr)
      .send({ ...tag })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list tag', async () => {
    const authStr = 'Bearer ' + token

    const response = await request(app)
      .get('/tag')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to list tags', async () => {
    const authStr = 'Bearer ' + token

    const tag = {
      note: 10,
      comment: 'test'
    }

    await request(app)
      .post('/tag')
      .set('Authorization', authStr)
      .send({ ...tag })

    const response = await request(app)
      .get('/tag')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single tag', async () => {
    const authStr = 'Bearer ' + token

    const tag = {
      note: 10,
      comment: 'test'
    }

    await request(app)
      .post('/tag')
      .set('Authorization', authStr)
      .send({ ...tag })

    const response = await request(app)
      .get(`/tag/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update a single tag', async () => {
    const authStr = 'Bearer ' + token
    const initialTag = {
      note: 10,
      comment: 'test'
    }

    const tag = {
      note: 10,
      comment: 'test'
    }

    await request(app)
      .post('/tag')
      .set('Authorization', authStr)
      .send({ ...initialTag })

    const response = await request(app)
      .put(`/tag/${userID}`)
      .set('Authorization', authStr)
      .send({ ...tag })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single tag', async () => {
    const authStr = 'Bearer ' + token

    const tag = {
      note: 10,
      comment: 'test'
    }

    await request(app)
      .post('/tag')
      .set('Authorization', authStr)
      .send({ ...tag })

    const response = await request(app)
      .delete(`/tag/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'

let userID = 0

describe('Tag', () => {
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

  it('should be able to store tag', async () => {
    const tag = {
      note: 10,
      comment: 'test'
    }

    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .post('/tag')
      .set('Authorization', authStr)
      .send({ ...tag })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list tag', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get('/tag')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single tag', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get(`/tag/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update a single tag', async () => {
    const tag = {
      note: 10,
      comment: 'test'
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .put(`/tag/${userID}`)
      .set('Authorization', authStr)
      .send({ ...tag })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single tag', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .delete(`/tag/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })
})

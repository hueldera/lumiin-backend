import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'

let userID = 0

describe('Avaliation', () => {
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

  it('should be able to store avaliation', async () => {
    const avaliation = {
      posture: 'bom',
      communication: 'top'
    }

    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .post('/avaliation')
      .set('Authorization', authStr)
      .send({ ...avaliation })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list avaliation', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get('/avaliation')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single avaliation', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .get(`/avaliation/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update avaliation', async () => {
    const avaliation = {
      posture: 'bom',
      communication: 'top'
    }
    const authStr = 'Bearer ' + userID
    const response = await request(app)
      .put(`/avaliation/${userID}`)
      .set('Authorization', authStr)
      .send({ ...avaliation })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single avaliation', async () => {
    const authStr = 'Bearer ' + userID

    const response = await request(app)
      .delete(`/avaliation/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })
})

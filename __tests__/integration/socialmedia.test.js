import request from 'supertest'
import app from '../../src/app'
import factory from '../factories'
import roles from '../../src/config/roles'
import truncate from '../utils/truncate'

describe('Social Media', () => {
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

  it('should be able to store social media', async () => {
    const authStr = 'Bearer ' + token

    const socialMedia = {
      portfolio: 'portfolio',
      linkedin: 'linkedin',
      facebook: 'facebook',
      twitter: 'twitter'
    }

    const response = await request(app)
      .post('/socialMedia')
      .set('Authorization', authStr)
      .send({ ...socialMedia })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to list social media', async () => {
    const authStr = 'Bearer ' + token

    const socialMedia = {
      portfolio: 'portfolio',
      linkedin: 'linkedin',
      facebook: 'facebook',
      twitter: 'twitter'
    }

    await request(app)
      .post('/socialMedia')
      .set('Authorization', authStr)
      .send({ ...socialMedia })

    const response = await request(app)
      .get('/socialMedia')
      .set('Authorization', authStr)

    expect(response.body).not.toHaveLength(0)
  })

  it('should be able to show a single social media', async () => {
    const authStr = 'Bearer ' + token

    const socialMedia = {
      portfolio: 'portfolio',
      linkedin: 'linkedin',
      facebook: 'facebook',
      twitter: 'twitter'
    }

    await request(app)
      .post('/socialMedia')
      .set('Authorization', authStr)
      .send({ ...socialMedia })

    const response = await request(app)
      .get(`/socialMedia/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to update social media', async () => {
    const authStr = 'Bearer ' + token

    const initialSocialMedia = {
      portfolio: 'portfolio',
      linkedin: 'linkedin',
      facebook: 'facebook',
      twitter: 'twitter'
    }

    const socialMedia = {
      portfolio: 'portfolio',
      linkedin: 'linkedin',
      facebook: 'facebook',
      twitter: 'twitter'
    }

    await request(app)
      .post('/socialMedia')
      .set('Authorization', authStr)
      .send({ ...initialSocialMedia })

    const response = await request(app)
      .put(`/socialMedia/${userID}`)
      .set('Authorization', authStr)
      .send({ ...socialMedia })

    expect(response.body).toHaveProperty('id')
  })

  it('should be able to delete a single social media', async () => {
    const authStr = 'Bearer ' + token

    const socialMedia = {
      portfolio: 'portfolio',
      linkedin: 'linkedin',
      facebook: 'facebook',
      twitter: 'twitter'
    }

    await request(app)
      .post('/socialMedia')
      .set('Authorization', authStr)
      .send({ ...socialMedia })

    const response = await request(app)
      .delete(`/socialMedia/${userID}`)
      .set('Authorization', authStr)

    expect(response.body).toHaveProperty('success')
  })

  afterAll(async () => {
    await truncate()
  })
})

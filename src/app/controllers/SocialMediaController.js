import SocialMedia from '../models/SocialMedia.js'
import * as Yup from 'yup'

class SocialMediaController {
  async index(req, res) {
    SocialMedia.findAll().then(data => {
      return res.json(data)
    })
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      portfolio: Yup.string(),
      linkedin: Yup.string(),
      facebook: Yup.string(),
      twitter: Yup.string()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const exists = await SocialMedia.findOne({
      where: { user_id: req.userId }
    })
    if (exists) {
      return res.status(400).json({ error: 'Could not store record.' })
    }

    const socialMedia = await SocialMedia.create({
      ...req.body,
      user_id: req.userId
    })

    return res.json(socialMedia)
  }

  async show(req, res) {
    const socialMedia = await SocialMedia.findOne({
      where: { user_id: req.params.id }
    })
    return res.json(socialMedia)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      portfolio: Yup.string(),
      linkedin: Yup.string(),
      facebook: Yup.string(),
      twitter: Yup.string()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const socialMedia = await SocialMedia.findOne({
      where: { user_id: req.params.id }
    })

    if (!socialMedia)
      return res.status(400).json({ error: 'Social Media doenst exists' })

    socialMedia.update(req.body, { where: { user_id: req.params.id } })
    return res.json(socialMedia)
  }

  async destroy(req, res) {
    SocialMedia.destroy({ where: { user_id: req.params.id } }).then(deleted => {
      if (deleted) {
        return res.status(200).json({ success: 'Deleted successfully' })
      }
    })
  }
}

export default new SocialMediaController()

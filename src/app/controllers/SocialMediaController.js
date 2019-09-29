import SocialMedia from '../models/SocialMedia.js'
import * as Yup from 'yup'

class SocialMediaController {
  async index(req, res) {
    const socialMedia = SocialMedia.findAll()
    return res.json(socialMedia)
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      portfolio: Yup.string(),
      linkedin: Yup.string(),
      facebook: Yup.string(),
      twitter: Yup.string()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const exists = await SocialMedia.findOne({ where: { user_id: req.userId }})
    if(exists) {
      return res.status(400).json({ error: 'Could not store record.' })
    }

    const socialMedia = await SocialMedia.create(req.body)
    return res.json(socialMedia)
  }

  async show(req, res) {
    const socialMedia = await SocialMedia.findOne({ where: { id: req.params.id } })
    return res.json(socialMedia)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      portfolio: Yup.string(),
      linkedin: Yup.string(),
      facebook: Yup.string(),
      twitter: Yup.string()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const socialMedia = await SocialMedia.findOne({ where: { id: req.params.id } })
    socialMedia.update(req.body, { where: { id: req.params.id } })
    return res.json(socialMedia)
  }

  async destroy(req, res) {
    await SocialMedia.destroy({ where: { user_id: req.params.id } })
    return res.json({ success: 'Deleted successfully.' })
  }
}

export default new SocialMediaController()

import SocialMedia from '../models/SocialMedia.js'
import * as Yup from 'yup'

class SocialMediaController {
  async index(req, res) {
    try {
      const socialMedia = SocialMedia.findAll()
      return res.status(200).json(socialMedia)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find records. ' })
    }
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

    try {
      const socialMedia = await SocialMedia.create(req.body)
      return res.status(200).json(socialMedia)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to create record.' })
    }
  }

  async show(req, res) {
    try {
      const socialMedia = await SocialMedia.findOne({ where: { id: req.params.id } })
      return res.status(200).json(socialMedia)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find record. ' })
    }
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

    try {
      const socialMedia = await SocialMedia.findOne({ where: { id: req.params.id } })
      socialMedia.update(req.body, { where: { id: req.params.id } })
      return res.status(200).json(socialMedia)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to update record.' })
    }
  }

  async destroy(req, res) {
    try {
      await SocialMedia.destroy({ where: { id: req.params.id } })
      return res.status(200).json({ success: 'Deleted successfully.' })
    } catch (e) {
      return res.status(400).json({ error: 'Unable to delete record.' })
    }
  }
}

export default new SocialMediaController()

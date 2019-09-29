import Partners from '../models/Partners.js'
import * as Yup from 'yup'

class PartnersController {
  async index(req, res) {
    try {
      const partners = Partners.findAll()
      return res.status(200).json(partners)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to find records.' })
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      personalData: Yup.number().integer(),
      contacts: Yup.number().integer(),
      documents: Yup.number().integer(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const partners = await Partners.create(req.body)
      return res.status(200).json(partners)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to create record.' })
    }
  }

  async show(req, res) {
    try {
      const partners = await Partners.findOne({ where: { id: req.params.id } })
      return res.status(200).json(partners)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to find record.' })
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      personalData: Yup.number().integer(),
      contacts: Yup.number().integer(),
      documents: Yup.number().integer(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const partners = await Partners.findOne({ where: { id: req.params.id } })
      partners.update(req.body, { where: { id: req.params.id } })
      return res.status(200).json(partners)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to update record.' })
    }
  }

  async destroy(req, res) {
    try {
      await Partners.destroy({ where: { id: req.params.id } })
      return res.status(200).json({ success: 'Deleted successfully.' })
    } catch(e) {
      return res.status(400).json({ error: 'Unable to delete record.' })
    }
  }
}

export default new PartnersController()

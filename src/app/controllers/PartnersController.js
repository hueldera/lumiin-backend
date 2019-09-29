import Partners from '../models/Partners.js'
import * as Yup from 'yup'

class PartnersController {
  async index(req, res) {
    const partners = Partners.findAll()
    return res.json(partners)
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

    const partners = await Partners.create(req.body)
    return res.json(partners)
  }

  async show(req, res) {
    const partners = await Partners.findOne({ where: { id: req.params.id } })
    return res.json(partners)
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

    const partners = await Partners.findOne({ where: { id: req.params.id } })
    partners.update(req.body, { where: { id: req.params.id } })
    return res.json(partners)
  }

  async destroy(req, res) {
    await Partners.destroy({ where: { user_id: req.params.id } })
    return res.json({ success: 'Deleted successfully.' })
  }
}

export default new PartnersController()

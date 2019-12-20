import Tag from '../models/Tag.js'
import * as Yup from 'yup'

class TagController {
  async index(req, res) {
    Tag.findAll().then(data => {
      return res.json(data)
    })
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      note: Yup.number()
        .integer()
        .required(),
      comment: Yup.string()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const tag = await Tag.create({
      ...req.body,
      user_id: req.userId
    })

    return res.json(tag)
  }

  async show(req, res) {
    const tag = await Tag.findOne({ where: { user_id: req.params.id } })
    return res.json(tag)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      note: Yup.number().integer(),
      comment: Yup.string()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const tag = await Tag.findOne({ where: { user_id: req.params.id } })
    if (!tag) return res.status(400).json({ error: 'Tag doenst exists' })
    tag.update(req.body, { where: { user_id: req.params.id } })
    return res.json(tag)
  }

  async destroy(req, res) {
    Tag.destroy({ where: { user_id: req.params.id } }).then(deleted => {
      if (deleted) {
        return res.json({ success: 'Deleted successfully' })
      }
    })
  }
}

export default new TagController()

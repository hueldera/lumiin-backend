import Avaliation from '../models/Avaliation.js'
import * as Yup from 'yup'

class AvaliationController {
  async index(req, res) {
    Avaliation.findAll().then(data => {
      return res.json(data)
    })
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      posture: Yup.string().required(),
      communication: Yup.string().required()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const exists = await Avaliation.findOne({ where: { user_id: req.userId } })
    if (exists) {
      return res.status(400).json({ error: 'Could not store record.' })
    }

    const avaliation = await Avaliation.create({
      ...req.body,
      user_id: req.userId
    })
    return res.json(avaliation)
  }

  async show(req, res) {
    const avaliation = await Avaliation.findOne({
      where: { user_id: req.params.id }
    })
    return res.json(avaliation)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      posture: Yup.string(),
      communication: Yup.string()
    })

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const avaliation = await Avaliation.findOne({
      where: { user_id: req.params.id }
    })
    if (!avaliation)
      return res.status(400).json({ error: 'Avaliation doenst exists' })
    const updateAvaliation = await avaliation.update(req.body, {
      where: { user_id: req.params.id }
    })
    return res.json(updateAvaliation)
  }

  async destroy(req, res) {
    Avaliation.destroy({ where: { user_id: req.params.id } }).then(deleted => {
      if (deleted) {
        return res.json({ success: 'Deleted successfully' })
      }
    })
  }
}

export default new AvaliationController()

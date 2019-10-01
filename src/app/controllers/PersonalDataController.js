import PersonalData from '../models/PersonalData.js'
import * as Yup from 'yup'

class PersonalDataController {
  async index(req, res) {
    PersonalData.findAll().then(data => {
      return res.json(data)
    })
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      birth_date: Yup.date().required(),
      cpf_cnpj: Yup.string().required(),
      rg: Yup.string().required(),
      street: Yup.string().required(),
      house_number: Yup.number().integer().required(),
      house_complement: Yup.string(),
      neighborhood: Yup.string().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      country: Yup.string().required(),
      state_subscription: Yup.number().integer(),
      civic_subscription: Yup.number().integer(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const exists = await PersonalData.findOne({ where: { user_id: req.userId }})
    if (exists) {
      return res.status(400).json({ error: 'Could not store record.' })
    }

    const personalData = await PersonalData.create(req.body)
    return res.json(personalData)
  }

  async show(req, res) {
    const personalData = await PersonalData.findOne({ where: { user_id: req.params.id } })
    return res.json(personalData)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      birth_date: Yup.date(),
      cpf_cnpj: Yup.string(),
      rg: Yup.string(),
      street: Yup.string(),
      house_number: Yup.number().integer(),
      house_complement: Yup.string(),
      neighborhood: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      country: Yup.string(),
      state_subscription: Yup.number().integer(),
      civic_subscription: Yup.number().integer(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const personalData = await PersonalData.findOne({ where: { user_id: req.params.id } })
    personalData.update(req.body, { where: { user_id: req.params.id } })
    return res.json(personalData)
  }

  async destroy(req, res) {
    PersonalData.destroy({ where: { user_id: req.params.id }}).then(deleted => {
      if (deleted) {
        return res.status(200).json({ success: 'Deleted successfully' })
      }
    })
  }
}

export default new PersonalDataController()

import BankData from '../models/BankData.js'
import * as Yup from 'yup'

class BankDataController {

  async index(req, res) {
    BankData.findAll().then(data => {
      return res.json(data)
    })
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string().required(),
      holder: Yup.string().required(),
      account: Yup.string().required(),
      bank_branch: Yup.string().required(),
      bank: Yup.string().required(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const exists = await BankData.findOne({ where: { user_id: req.userId }})
    if (exists) {
      return res.status(400).json({ error: 'Could not store record. ' })
    }

    const bankData = await BankData.create(req.body)
    return res.json(bankData)
  }

  async show (req,res) {
    const bankData = await BankData.findOne({ where: { user_id: req.params.id }})
    return res.json(bankData)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.string(),
      holder: Yup.string(),
      account: Yup.string(),
      bank_branch: Yup.string(),
      bank: Yup.string(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const bankData = await BankData.findOne({ where: { user_id: req.params.id }})
    bankData.update(req.body, { where: { user_id: req.params.id }})
    return res.json(bankData)
  }

  async destroy(req,res) {
    await BankData.destroy({ where: { user_id: req.params.id }})
    return res.json({ success: 'Deleted successfully'})
    BankData.destroy({ where: { id: req.params.id }}).then(deleted => {
      if (deleted) {
        return res.status(200).json({ success: 'Deleted successfully' })
      }
    })
  }
}

export default new BankDataController()

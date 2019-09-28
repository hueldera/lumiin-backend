import BankData from '../models/BankData.js'
import * as Yup from 'yup'

class BankDataController {

  async index(req, res) {
    try {
      const bankData = BankData.findAll()
      return res.status(200).json(bankData)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to find records. ' })
    }
  }

  async store (req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.number().required(),
      holder: Yup.string().required(),
      account: Yup.number().required(),
      bank_branch: Yup.string().required(),
      bank: Yup.string().required(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const bankData = await BankData.create(req.body)
      return res.status(200).json(bankData)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to create record. ' })
    }

  }

  async show (req,res) {
    try {
      const bankData = await BankData.findOne({ where: { id: req.params.id }})
      return res.status(200).json(bankData)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find this record.'})
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      cpf: Yup.number().required(),
      holder: Yup.string().required(),
      account: Yup.number().required(),
      bank_branch: Yup.string().required(),
      bank: Yup.string().required(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const bankData = await BankData.findOne({ where: { id: req.params.id }})
      bankData.update(req.body, { where: { id: req.params.id }})
      return res.status(200).json(bankData)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to update data.'})
    }
  }

  async destroy(req,res) {
    try {
      await BankData.destroy({ where: { id: req.params.id }})
      return res.status(200).json({ success: 'Deleted successfully'})
    } catch(e) {
      return res.status(400).json({ error: 'Unable to delete data.' })
    }
  }
}

export default new BankDataController()

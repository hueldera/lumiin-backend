import Contacts from '../models/Contacts.js'
import * as Yup from 'yup'

class ContactsController {
  async index(req, res) {
    try {
      const contacts = Contacts.findAll()
      return res.status(200).json(contacts)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find records. ' })
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      phone: Yup.number().integer(),
      cellphone: Yup.number().integer(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails. ' })
    }

    try {
      const contact = await Contacts.create(req.body)
      return res.status(200).json(contact)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to create record. ' })
    }
  }

  async show(req, res) {
    try {
      const contact = await Contacts.findOne({ where: { id: req.params.id } })
      return res.status(200).json(contact)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to find record. ' })
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string(),
      phone: Yup.number().integer(),
      cellphone: Yup.number().integer(),
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails. ' })
    }

    try {
      const contact = await Contacts.findOne({ where: { id: req.params.id } })
      contact.update(req.body, { where: { id: req.params.id } })
      return res.status(200).json(contact)
    } catch(e) {
      return res.status(400).json({ error: 'Unable to update record.' })
    }
  }

  async destroy(req, res) {
    try {
      await Contacts.destroy({ where: { id: req.params.id } })
      return res.status(200).json({ success: 'Deleted successfully.' })
    } catch(e) {
      return res.status(400).json({ error: 'Unable to delete record. ' })
    }
  }

}

export default new ContactsController()

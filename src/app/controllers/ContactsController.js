import Contacts from '../models/Contacts.js'
import * as Yup from 'yup'

class ContactsController {
  async index(req, res) {
    const contacts = Contacts.findAll()
    return res.json(contacts)
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

    const contact = await Contacts.create(req.body)
    return res.json(contact)
  }

  async show(req, res) {
    const contact = await Contacts.findOne({ where: { id: req.params.id } })
    return res.json(contact)
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

    const contact = await Contacts.findOne({ where: { id: req.params.id } })
    contact.update(req.body, { where: { id: req.params.id } })
    return res.json(contact)
  }

  async destroy(req, res) {
    await Contacts.destroy({ where: { id: req.params.id } })
    return res.json({ success: 'Deleted successfully.' })
  }

}

export default new ContactsController()

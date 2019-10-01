import Contacts from '../models/Contacts.js'
import * as Yup from 'yup'

class ContactsController {
  async index(req, res) {
    Contacts.findAll().then(data => {
      return res.json(data)
    })
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

    const exists = await Contacts.findOne({ where: { user_id: req.userId }})
    if (exists) {
      return res.status(400).json({ error: 'Could not store record.' })
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
    await Contacts.destroy({ where: { user_id: req.params.id } }).then(deleted => {
      if (deleted) {
        return res.json({ success: 'Deleted successfully.' })
      }
    })
  }

}

export default new ContactsController()

import Documents from '../models/Documents.js'
import * as Yup from 'yup'

class DocumentsController {
  async index(req, res) {
    Documents.findAll().then(data => {
      return res.json(data)
    })
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      document: Yup.string(),
      photo: Yup.string()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }
    const documents = await Documents.create(req.body)
    return res.json(documents)
  }

  async show(req, res) {
    const documents = await Documents.findOne({ where: { id: req.params.id } })
    return res.json(documents)
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      document: Yup.string(),
      photo: Yup.string()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    const documents = await Documents.findOne({ where: { id: req.params.id } })
    documents.update(req.body, { where: { id: req.params.id } })
    return res.json(documents)
  }

  async destroy(req, res) {
    Documents.destroy({ where: { id: req.params.id }}).then(deleted => {
      if (deleted) {
        return res.status(200).json({ success: 'Deleted successfully' })
      }
    })
  }

}

export default new DocumentsController()

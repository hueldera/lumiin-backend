import Documents from '../models/Documents.js'
import * as Yup from 'yup'

class DocumentsController {
  async index(req, res) {
    try {
      const documents = Documents.findAll()
      return res.status(200).json(documents)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find records. ' })
    }
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      document: Yup.string(),
      photo: Yup.string()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const documents = await Documents.create(req.body)
      return res.status(200).json(documents)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to create record.' })
    }
  }

  async show(req, res) {
    try {
      const documents = await Documents.findOne({ where: { id: req.params.id } })
      return res.status(200).json(documents)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to find record. ' })
    }
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      document: Yup.string(),
      photo: Yup.string()
    })

    if (!await schema.isValid(req.body)) {
      return res.status(400).json({ error: 'Validation fails.' })
    }

    try {
      const documents = await Documents.findOne({ where: { id: req.params.id } })
      documents.update(req.body, { where: { id: req.params.id } })
      return res.status(200).json(documents)
    } catch (e) {
      return res.status(400).json({ error: 'Unable to update record.' })
    }
  }

  async destroy(req, res) {
    try {
      await Documents.destroy({ where: { id: req.params.id } })
      return res.status(200).json({ success: 'Deleted successfully.' })
    } catch (e) {
      return res.status(400).json({ error: 'Unable to delete record.' })
    }
  }

}

export default new DocumentsController()

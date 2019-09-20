import User from '../models/User'
import File from '../models/File'
import roleList from '../../config/roles'

class ProviderController {
  async index (req, res) {
    const providers = await User.findAll({ where: { role: roleList.PROVIDER },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [{
        model: File,
        as: 'avatar',
        attributes: ['name', 'path', 'url']
      }] })

    return res.json(providers)
  }
}

export default new ProviderController()

import User from '../models/User'

export default function hasRole (roles) {
  if (!Array.isArray(roles)) {
    roles = [roles]
  }
  return async (req, res, next) => {
    const user = await User.findByPk(req.userId)
    const { role } = user
    if (!roles.includes(role)) {
      return res.status(401).json({ error: 'User without permission.' })
    }

    return next()
  }
}

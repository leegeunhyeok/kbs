const { Sequelize, sequelize } = require('../bootstrap/database')

// Dust 모델 정의
const Dust = sequelize.define('Dust', {
  info: {
    type: Sequelize.TEXT,
    defaultValue: '알 수 없음'
  }
}, {
  freezeTableName: true
})


exports.init = () => {
  return Dust.sync({ force: true })
}


exports.get = () => {
  return Dust.findOne()
}


exports.update = async DustInfo => {
  await Dust.destroy({
    where: {},
    truncate: true
  })

  await Dust.create({
    info: DustInfo
  })
}

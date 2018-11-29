const schedule = require('node-schedule')
const Weather = require('./Weather'),
      Dust = require('./Dust')

exports.init = () => {

  // 매 시간마다 날씨데이터 갱신
  schedule.scheduleJob('0 0 * * * * *', async () => {
    await Weather.update()
    await Dust.update()
  })

  console.log('Scheduler initialized'.cyan)
}

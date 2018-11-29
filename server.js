const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const message = require('./messages.js')
require('colors')

const Dust = require('./src/Dust')
const Weather = require('./src/Weather')

const scheduler = require('./src/scheduler')

const init = async () => {
  await require('./bootstrap/database').init()

  await Dust.init()
  await Weather.init()

  await Dust.update()
  await Weather.update()

  scheduler.init()

  const app = express()

  // 서버 포트 설정 (기본포트 8080)
  if (config.has('port')) {
    app.set('port', config.get('port'))
  } else {
    app.set('port', 8080)
  }


  app.use('/img', express.static('img'))
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())


  // GET /keyboard
  app.get('/keyboard', (req, res) => {
    res.json(message.start)
  })


  // POST /message
  app.post('/message', (req, res) => {
    const userMessage = req.body.content
    console.log('User request message: ' + userMessage.green)

    if (userMessage === '◇ 미세먼지정보') {
      Dust.get().then(result => {
        res.send({
          message: {
            text: result
          },
          keyboard: {
            type: 'buttons',
            buttons: [
              '◇ 부산 날씨정보',
              '◇ 미세먼지정보',
              '◇ 교통정보',
              '◇ 버스정보',
              '◇ 도시철도정보',
              '◆ 이전 단계로 (서비스메뉴)'
            ]
          }
        })
      })
    } else if (userMessage === '◇ 부산 날씨정보') {
      Weather.get().then(result => {
        res.send({
          message: {
            text: result
          },
          keyboard: {
            type: 'buttons',
            buttons: [
              '◇ 부산 날씨정보',
              '◇ 미세먼지정보',
              '◇ 교통정보',
              '◇ 버스정보',
              '◇ 도시철도정보',
              '◆ 이전 단계로 (서비스메뉴)'
            ]
          }
        })
      })
    } else {
      for (let i = 0; i < message.datas.length; i++) {
        try {
          if (message.datas[i]['hook'] === userMessage) {
            res.json(message.datas[i]['res'])
            return
          }
        } catch (e) {
          res.json(message.fallback)
        }
      }
      res.send(message.fallback)
    }
  })


  // 실행 중 알 수 없는 부분에서 예외 발생할 경우 
  process.on('uncaughtException', e => {
    console.log(e.toString().red)
  })


  // 서버 시작
  app.listen(app.get('port'), () => {
    console.log('!!! Server started !!!'.rainbow)
  })
}

init()

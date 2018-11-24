const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const message = require('./messages.js')

const { DustInfo } = require('./src/dust_info')
const dustInfo = new DustInfo()

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
  console.log('유저 메시지: ' + userMessage)
  if (userMessage === '◇ 미세먼지정보') {
    dustInfo.getInfo().then(result => {
      res.send({
        message: {
          text: '미세먼지 정보입니다\n\n' + result
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
    }).catch(e => {
      console.log('ERROR: 미세먼지 정보 불러오기 실패', e)
      res.send({
        message: {
          text: '죄송합니다. 현재 미세먼지 정보를 불러올 수 없습니다.'
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
process.on('uncaughtException', err => {
  console.log(err)
})


// 서버 시작
app.listen(app.get('port'), () => {
  console.log('서버 실행 중.. 포트: ' + app.get('port'))
})
const express = require('express')
const bodyParser = require('body-parser')
const config = require('config')
const message = require('./messages.js')

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
  res.json(message.main)
})


// POST /message
app.post('/message', (req, res) => {
  const userMessage = req.body.content
  console.log('유저 메시지: ' + userMessage)
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
  res.json(message.fallback)
})

app.


// 실행 중 알 수 없는 부분에서 예외 발생할 경우 
process.on('uncaughtException', err => {
  console.log(err)
})


// 서버 시작
app.listen(app.get('port'), () => {
  console.log('서버 실행 중.. 포트: ' + app.get('port'))
})
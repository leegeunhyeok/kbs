const request = require('request'),
      cheerio = require('cheerio')

const url = 'http://www.airkorea.or.kr/dustForecast'
const dayString = ['오늘', '내일', '모레']

const DustModel = require('../model/Dust')

var Dust = {}

Dust.init = async function () {
  await DustModel.init()
  console.log('Dust model defined'.cyan)
}


Dust.update = async function () {
  const body = await new Promise((resolve, reject) => {
    request({
      url: url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36'
      }
    }, (err, res, body) => {
      if (err) {
        reject(err)
      } else {
        resolve(body)
      }
    })
  })
  
  const $ = cheerio.load(body)
  const tables = $('table.table_04.mb10')
  let result = ""
  let day = 0
  tables.each(function (idx) {
    let ths = $(this).find('th')
    let tds = $(this).find('td')
    ths.each(function (idx) {
      if ($(this).text() === '부산') {
        tds.each(function (td_idx) {
          if (idx === td_idx) {
            result += ' ▷ ' + dayString[day++] + ": " + $(this).text() + '\n'
          }
        })
      }
    })
  })

  await DustModel.update(result)
  console.log('Dust data updated'.cyan)
}


Dust.get = async function () {
  try {
    const dust = await DustModel.get()
    return '◐ 미세먼지 정보 ◑\n' + dust.info
  } catch (e) {
    console.log(e.message.red)
    return '죄송합니다. 현재 미세먼지 정보를 불러올 수 없습니다.'
  }
}

module.exports = Dust

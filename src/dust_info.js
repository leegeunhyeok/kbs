const request = require('request'),
      cheerio = require('cheerio')

const url = 'http://www.airkorea.or.kr/dustForecast'
const dayString = ['오늘', '내일', '모레']

class DustInfo {
  async getInfo () {
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
              result += dayString[day++] + ": " + $(this).text() + "\n"
            }
          })
        }
      })
    })

    return result
  }
}

module.exports = {
  DustInfo: DustInfo
}

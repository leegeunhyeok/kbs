const publicIp = require('public-ip')

var serverIp = ''

exports.init = () => {
  return new Promise((resolve, reject) => {
    publicIp.v4.then(ip => {
      serverIp = ip
    }).catch(e => {
      serverIp = 'localhost'
    }).finally(() => {
      resolve()
    })
  })
}
const axios = require('axios')
// 通过body-parser 对象创建中间件，当接收到客户端请求时所有的中间件都会给req.body 添加属性
const bodyParser = require('body-parser')
const express = require('express')
const apiRoutes = express.Router()
const app = express()
app.use('/api', apiRoutes)
app.use(bodyParser.urlencoded({ extended: true }))


// 代理歌单列表
app.get('/api/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios
    .get(url, {
      headers: {
        referer: 'https://c.y.qq.com',
        host: 'c.y.qq.com'
      },
      params: req.query
    })
    .then(response => {
      res.json(response.data)
    })
    .catch(e => {
      console.log(e)
    })
})

// 音乐文件url处理信息获取
app.post('/api/getPurlUrl', bodyParser.json(), function (req, res) {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  axios.post(url, req.body, {
    headers: {
      referer: 'https://y.qq.com/',
      origin: 'https://y.qq.com',
      'Content-type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    res.json(response.data)
  }).catch(e => {
    console.log(e)
  })
})







app.listen(9093, function () {
  console.log('node端口打开的是 ')
})

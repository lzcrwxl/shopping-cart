const user=require('./User');

console.log("userName:"+user.username)
console.log("say:"+user.sayHello())

let http=require('http')
let  util=require('util')
let  url=require('url')
let server=http.createServer(function (req,res) {
  res.statusCode=200;
  res.setHeader('Content-type','text/plain')
  console.log(req.url)
  res.end(util.inspect(url.parse(req.url)))
})

server.listen(3000,'127.0.0.1',function () {
  console.log("服务器已经开启")
})

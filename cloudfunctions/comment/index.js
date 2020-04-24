// 云函数入口文件
const fetch = require('node-fetch')
// 云函数入口函数
exports.main = async (event, context) => {
  return await fetch(`http://api.douban.com/v2/movie/subject/${event.movieid}?apikey=0df993c66c0c636e29ecbb5344252a4a`)
  .then(res => {
    console.log(res);
    return res.json()
  }).catch(err => {
    console.log(err);
  })
}
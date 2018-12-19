var fs 		= require('fs')
var axios 	= require('axios')

// 三类码的地址
let urls = {
	A: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=',
	B: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=',
	C: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token='
}



module.exports = (req, res) => {
	// 解构参数数据
	let {appid, secret, path, scene, width, type} = req.query
	// 小程序码地址
	let url = urls[type]
	// 创建请求对象
	let post_data = {path, width}
	// 如果是B类型的
	if(type === 'B'){
		post_data.scene = scene
	}
	// 图片存储路径
	let filePath = `/static/upload/${appid}_${width}_${type}.png`
	// 获取token
	axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
		.then(({data})=>{
			// 继续获取小程序码
			axios.post(url+data.access_token, post_data, {
				// 响应类型
				responseType: 'stream',
				// 头部
				headers: {
					'Content-Type': 'application/json'
				}
			}).then(({data}) => {
				// 存储图片
				data.pipe(fs.createWriteStream(process.cwd() + filePath))
				// 图片存储成功
				data.on('end', () => {
					// 返回图片存储地址
					res.json({
						data: filePath,
						error: 0
					})
				})
			})
		})
}
const jwt = require("jsonwebtoken");

const secretOrPrivateKey = "HappyHourMiao";




// 解析获取（校验）
const verifyToken = async (token) => {
	return new Promise((resolve, reject) => {
		
		jwt.verify(token, secretOrPrivateKey, function (err, decode) {
			if (err) {  //  时间失效的时候/ 伪造的token     
				resolve({err: err});     
			} else {
				resolve(decode);
			}
		})
	})
}

/* 校验是否登录 */
exports.isLogined = async (ctx, next) => {
	let token = ctx.header["x-access-token"]; // 从header中获取token
	
	let decode = await verifyToken(token);
	if(decode.err) {
		return ctx.body = {err: '登录信息错误，请重新登录'}
	}
	ctx.token = decode;
	return next();
}

// 生成Token: {userId, timetamp, }
/*
 * 	现在还是整个user放进来了，
 * */
exports.createToken = (content) => {
	let token = jwt.sign(
						content,
						secretOrPrivateKey,
						{ expiresIn: 60 * 60 * 24 /*24小时过期*/ }
					);
	return token;
}
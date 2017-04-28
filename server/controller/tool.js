exports.uploadImage = (name) => async (ctx, next) => {

	console.log(ctx.req.file)
	console.log(ctx.req.files)
	console.log(ctx.req.body)
	ctx.body = {
		success: 'ok'
	}
	next();
}

exports.uploadVideo = (name) => async (ctx, next) => {
	next();
}

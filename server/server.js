// const html = require('../dist/index.html');
const http = require('http');

const host = '192.168.155.1';
const port = 3000;

const server = http.createServer((req, res) => {
	console.log('xxxx');
	res.statusCode = 200;

	res.setHeader('Content-type', 'text/plain');

	res.end('sss');
})

server.listen(port, host, () => {
	console.log(`node server open in http://${host}:${port}`);
})
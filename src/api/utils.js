const imgpath = '/images';

const utils = {
	img: (name) => {
		return `${imgpath}/${name}`;
	},

	typeof: (param) => {
		let _str = Object.prototype.toString.call(param);
		_str = _str.slice(8, -1);
		return _str;
	},

	reg: {
		email : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		mobile : /^0?1[3|4|5|8][0-9]\d{8}$/,
		int : /^[-]?([0-9]+\d*)$/,
		positiveInt : /^([1-9]+\d*)$/,
		number : /^(-?\d+)(\.\d+)?$/,
		date : /^(\d{4})-(\d{2})-(\d{2})$/,
		datetime : /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/,
		idCardNo:/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
	}

}
export default utils;

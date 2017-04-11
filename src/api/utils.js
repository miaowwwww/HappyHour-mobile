const utils = {};
const imgpath = '/images';
utils.img = function(name) {
	return `${imgpath}/${name}`;
}

export default utils;
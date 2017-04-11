import React, {Component, PropTypes} from 'react';

import '../css/Banner.less';
import img_banner from '../images/brand.png';

export default function Banner() {
	return (
		<header className='Banner'>
			<img src={img_banner} className='Banner-brand' />
			<p className='Banner-info'>星期一，3月6日</p>
			<i className='Banner-search iconfont icon-sousuo'></i>
		</header>
	)
}

import React, {Component, PropTypes} from 'react';

import '../css/Banner.less';
import img_banner from '../images/brand.png';

export default function Banner({ img, text, icon }) {
	return (
		<header className='Banner'>
			<img src={img} className='Banner-brand' />
			<div className='Banner-info'>{text}</div>
			<i className='Banner-search'>
				{
					icon //<i className="iconfont icon-sousuo"></i>
				}
			</i>
		</header>
	)
}

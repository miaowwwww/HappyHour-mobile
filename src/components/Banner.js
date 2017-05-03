import React, {Component, PropTypes} from 'react';

import '../css/Banner.less';
import img_banner from '../images/brand.png';

export default function Banner({ img, text, icon, className, ...rest }) {
	return (
		<header className={`Banner ${className}`} {...rest}>
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

import React, { PropTypes } from 'react';
import Options from './Options';
import Header from './Header';

import style from './PageMy.less'


class PageMy extends React.Component {
	render() {
		return (
			<div id={style.pageMy}>
				<Header />
				<Options />
			</div>
		)
	}

};

module.exports =  PageMy;
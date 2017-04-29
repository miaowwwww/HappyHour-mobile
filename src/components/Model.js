import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';


/*
 *	为子类提供了 static 静态方法show() 返回promise
 *	实例属性有： _resolve, _reject, _container, _removeView
*/

export default class Model extends Component {
	constructor(props) {
		super(props);
		this._promise = new Promise((resolve, reject) => {
			this._resolve = resolve;
			this._reject = reject;
		});
		this._container = null;
	}

	static show(props) {
		let div = document.createElement('div');
		let vdom = render(<this {...props} />, div);
		document.body.appendChild(div);
		vdom._container = div;
		return vdom._promise;
	}

	_removeView() {
		this._container.remove();
		unmountComponentAtNode(this._container);
	}
	_resolveView(data) {
		this._resolve(data);
		this._removeView();
	}
	_rejectView(data) {
		this._reject(data);
		this._removeView();
	}
};



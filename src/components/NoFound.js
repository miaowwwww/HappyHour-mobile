import React, { Component } from 'react';
import img_meiyouxinxi from '../images/meiyouxinxi.gif';
import '../css/NoFound.less';

export default function NoFound({text, className}) {
	return (
		<div className={`NoFound ${className}`}>
			<img src={img_meiyouxinxi} className="NoFound-img" />
			<div className="NoFound-content">{text}</div>
		</div>
	)
}
const Tool = {};

Tool.typeof = (param) => {
	let _str = Object.prototype.toString.call(param);
	_str = _str.slice(8, -1);
	return _str;
}

Tool.time = {}
/*
 * 计算两个日期的差值
 * @param firstDateStr：（Date | String | 
 * @param secondDateStr
 * return {
 * 	describe: '3天14小时43分27秒', //两个日期相差的时间
 * 	seconds: 32424 //两个日期相差的秒数	
 * }
 * var reg = /^(\d+)?\D(\d+)\D(\d+)\D/
 * var reg2 = /(\d+):(\d+):(\d+)/g
 * */
Tool.time.getDateInterval = function(firstDateStr, secondDateStr){
	var result = {describe:""};
	var firstDate = new Date(Date.parse(firstDateStr.replace(/-/g, "/")));
	var secondDate = new Date(Date.parse(secondDateStr.replace(/-/g, "/")));
	
	//计算两个日期之间相差的毫秒数
	var milliseconds = firstDate.getTime() - secondDate.getTime();
	var secondCount = Math.floor(milliseconds / 1000);
	result.seconds = secondCount;
	
	var second = secondCount % 60; 
	var minute = Math.floor(secondCount / 60) % 60;
	var hour = Math.floor(secondCount / 60 / 60) % 24;
	var day = Math.floor(secondCount / 60 / 60 / 24);
	
	if(day)
		result.describe += day + "天";
	if(hour)
		result.describe += hour + "小时";
	if(minute)
		result.describe += minute + "分钟";
	if(second && !day && !hour)
		result.describe += second + "秒";
	
	return result;
}
//对Date的扩展，将 Date 转化为指定格式的String   
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
//例子：   
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18   
Date.prototype.Format = function(fmt) { //author: meizz   
	var o = {   
			"M+" : this.getMonth()+1,                 //月份   
			"d+" : this.getDate(),                    //日   
			"h+" : this.getHours(),                   //小时   
			"m+" : this.getMinutes(),                 //分   
			"s+" : this.getSeconds(),                 //秒   
			"q+" : Math.floor((this.getMonth()+3)/3), //季度   
			"S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	} 
	for(var k in o)
		if(new RegExp("("+ k +")").test(fmt)) 
	  
	fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}  



/**
 * session sessionStorage
 * 操作
 */
Tool.setSession = function(key,data){
	sessionStorage.setItem(key, JSON.stringify(data));
}

Tool.getSession = function(key){
	var sessionData = sessionStorage.getItem(key);
	if(sessionData==null){
		return null;
	}
	return JSON.parse(sessionData);
}

Tool.clearSession = function(key){
	window.sessionStorage.removeItem(key);
}
//localStorage
Tool.setLocal = function(key,data){
	localStorage.setItem(key, JSON.stringify(data));
}

Tool.getLocal = function(key){
	var localData = localStorage.getItem(key);
	if(localData){
		return JSON.parse(localData);
	}
	return null;
}

Tool.clearLocal = function(key){
	window.localStorage.removeItem(key);
}
var util = {};

// function delCookie(name, domain) {
// 	var exp = new Date();
// 	exp.setTime(exp.getTime() - 1);
// 	var cval = getCookie(name);
// 	if (cval != null)
// 		document.cookie = name + "=" + cval + ";path=/;expires=" + exp.toGMTString() + ";domain=" + domain;
// }
var href = window.location.href;
var http = 'http';
if (href.split('://')[0] != 'http') {
	http = 'https';
}
// 接口域名
// util.api = http + "://guanrd.weiyingjia.org/busplatApi";
util.api = http + "://jvtd.cn/busplatApi";

//  $ajax封装
util.get = function(url, data) {
	var _this = this;
	return new Promise(function(resolve, reject){
		var headers = {};
		var token = sessionStorage.getItem('USER_TOKEN') || sessionStorage.token;
		if (token) {
			headers.Authorization = token;
		}
		$.ajax({
			url: _this.api + url,
			type: 'GET',
			data,
			headers: headers,
			success: function(response){
				resolve(response)
			},
			error: function(error){
				if (error.responseJSON.result == "90000002") {
					// delCookie('user_json', '.weiyingjia.org'); //测试环境
					// delCookie('_logout', '.weiyingjia.org'); //测试环境
					delCookie('user_json', '.jvtd.cn'); //正式环境
					delCookie('_logout', '.jvtd.cn'); //测试环境
					sessionStorage.clear();
					setTimeout(function() {
						window.location.href = 'index.html'
					}, 1000)
				}
				// reject(error)
			}
		})
	})
}
util.post = function(url, data) {
	var _this = this;
	return new Promise(function(resolve, reject){
		$.ajax({
			url: _this.api + url,
			type: 'post',
			data: JSON.stringify(data),
			dataType: 'json',
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				resolve(response)
			},
			error: function(error){
				if (error.responseJSON.result == "90000002") {
					// delCookie('user_json', '.weiyingjia.org'); //测试环境
					// delCookie('_logout', '.weiyingjia.org'); //测试环境
					delCookie('user_json', '.jvtd.cn'); //正式环境
					delCookie('_logout', '.jvtd.cn'); //测试环境
					sessionStorage.clear();
					setTimeout(function() {
						window.location.href = 'index.html'
					}, 1000)
				}
				// reject(error)
			}
		})
	})
}
/**
 * 返回精确的n位小数数值
 * @param data:number
 * @param type:string
 * 例：formatDate(1523440865000,yyyy-mm-dd) 得到 '2018-04-11'
 * 例：formatDate(1523440865000,yyyy-mm-dd hh:mm:ss) 得到 '2018-04-11 18:1:5'
 */

function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n
}

util.formatDate = function(date, type) {
	if (typeof(date) == 'string') {
		return date;
	} else {
		var date = new Date(date);
		var year = date.getFullYear()
		var month = date.getMonth() + 1
		var day = date.getDate()
		var hour = date.getHours()
		var minute = date.getMinutes()
		var second = date.getSeconds()

		if (type === 'YYYY-MM-DD') {
			return [year, month, day].map(formatNumber).join('-')
		} else {
			return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
		}
	}
}
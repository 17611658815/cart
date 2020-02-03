var app = new Vue({
	el: "#app",
	data() {
		return {
			tabTrue: 0, //控制tab切换,
			newsList: [],
			cityYiqing: [],
			totalObj: {}
		}
	},
	mounted() {
		var _this = this;
		var tab = document.getElementsByClassName('tab')[0]; //获取tab导航元素
		var dynamic = document.getElementsByClassName('dynamic')[0]; //获取疫情数据元素
		var realTime = document.getElementsByClassName('realTime')[0]; //获取实时数据元素
		var knowledge = document.getElementsByClassName('knowledge')[0]; //获取防控知识元素
		// 页面滚动事件start
		window.onscroll = function() {
			var scrollT = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop; //获取滚动条高度
			/*
			 * 滚动条高度大于 dynamic.offsetTop - tab.offsetHeight 则tab导航黏贴页面顶部.
			 * 		  否则 回复原样.
			 */
			if (scrollT >= dynamic.offsetTop - tab.offsetHeight) {
				tab.className = 'tab positioning';
				dynamic.style.marginTop = '2.9rem';
			} else {
				tab.className = 'tab'
				dynamic.style.marginTop = '0';
				_this.tabTrue = 0;
			}
			/**
			 * 滚动条滚动.切换tab导航样式.
			 * */
			if (scrollT >= dynamic.offsetTop - tab.offsetHeight && scrollT < realTime.offsetTop - tab.offsetHeight) {
				_this.tabTrue = 1;
			} else if (scrollT >= realTime.offsetTop - tab.offsetHeight && scrollT < knowledge.offsetTop - tab.offsetHeight) {
				_this.tabTrue = 2;
			} else if (scrollT >= knowledge.offsetTop - tab.offsetHeight) {
				_this.tabTrue = 3;
			}
		};
		//页面滚动事件end

		this.selEpidemicDynamicsList();
		this.selBroadcastList();
		this.selStatistics();
	},
	methods: {
		/**
		 * 切换导航条事件.
		 * 	直接定位到该元素文档中的位置.
		 * */
		changeTab(num) {
			var tab = document.getElementsByClassName('tab')[0];
			if (num == 1) {
				var dynamic = document.getElementsByClassName('dynamic')[0];
				window.scrollTo(0, dynamic.offsetTop - tab.offsetHeight);
			} else if (num == 2) {
				var realTime = document.getElementsByClassName('realTime')[0];
				window.scrollTo(0, realTime.offsetTop - tab.offsetHeight);
			} else {
				var knowledge = document.getElementsByClassName('knowledge')[0];
				window.scrollTo(0, knowledge.offsetTop - tab.offsetHeight);
			}
		},
		// 疫情地区信息接口 
		selEpidemicDynamicsList() {
			util.get('/selEpidemicDynamicsList').then(res => {
				this.cityYiqing = res.data;
				this.chartData(res.data);
			})
		},
		// 疫情实时新闻接口 
		selBroadcastList() {
			util.get('/selBroadcastList').then(res => {
				this.newsList = res.data;
			})
		},
		// 疫情总数据接口 
		selStatistics() {
			util.get('/selStatistics').then(res => {
				res.data.modifyTime = util.formatDate((res.data.modifyTime + '000') / 1);
				this.totalObj = res.data;
			})
		},
		//疫情新闻跳转
		href(url){
			window.location.href = url;
		},
		//echarts 地图渲染
		chartData(obj) {
			var provenceInfo = [];
			var max = 0;
			$.each(obj, function(index, item) {
				provenceInfo.push({
					name: item.region,
					value: item.diagnosis,
					suspected: item.suspected,
					cure: item.cure,
					death: item.death
				});
				if (item.count > max) {
					max = item.count;
				}
			});
			provenceInfo.push({
				name: "南海诸岛",
				value: 0,
				itemStyle: {
					normal: {
						opacity: 0,
						label: {
							show: false
						}
					}
				}
			})
			// 基于准备好的dom，初始化echarts实例
			var myChart = echarts.init(document.getElementById('echarts'));
			var mytextStyle = {
				color: "#333", //文字颜色
				fontStyle: "normal", //italic斜体  oblique倾斜
				fontWeight: "normal", //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
				fontFamily: "sans-serif", //字体系列
				fontSize: 18, //字体大小
			}
			var option = {
				backgroundColor: "#ffffff",
				legend: {
					orient: "vertical",
					left: 10,
					bottom: 20
				},
				geo: {
					map: "china",
					zoom: 1.2,
					top: 30,
					scaleLimit: {
						min: 1.2,
						max: 1.2
					},
					label: {
						normal: {
							show: false, //是否在普通状态下显示标签。
							textStyle: mytextStyle, //普通状态下的标签文本样式。
						},
						emphasis: {
							show: false, //是否在高亮状态下显示标签。
							textStyle: mytextStyle //高亮状态下的标签文本样式。
						}
					},
					regions: [{
						name: "南海诸岛",
						value: 0,
						itemStyle: {
							normal: {
								opacity: 1,
								label: {
									show: false
								}
							}
						}
					}]
				},
				tooltip: {
					trigger: 'item',
					formatter: function(p) {
						for (var i = 0; i < provenceInfo.length; i++) {
							//                            console.log(p.name);
							if (p.name == provenceInfo[i].name)
								return p.name + '<br/>确诊病例:' + '  ' + provenceInfo[i].value +
									"<br/>疑似病例:" + '  ' + provenceInfo[i].suspected +
									"<br/>治愈人数:" + '  ' + provenceInfo[i].cure +
									"<br/>死亡人数:" + '  ' + provenceInfo[i].death
						}
						if (!p) {
							return '{b} <br/> -'
						}
					}
				},
				visualMap: [{
					show: true,
					type: "piecewise",
					align: "left",
					min: 0,
					left: 0,
					bottom: 20,
					itemWidth: 40,
					itemHeight: 20,
					max: max,
					pieces: [{
							min: 1001,
							label: ">1000人",
							color: "#7E1200"
						},
						{
							min: 100,
							max: 1000,
							label: "100-1000人",
							color: "#FF5429"
						},
						{
							min: 1,
							max: 99,
							label: "1-99人",
							color: "#FE8C71"
						},
						{
							label: "疑似",
							color: "#FED668",
							value: "yisi"
						},
						{
							value: 0,
							label: "0人",
							color: "#F3F3F3"
						},
					],
					calculable: true,
					inRange: {
						color: ['#F3F3F3', '#FED668', '#FE8C71', '#FF5429', '#7E1200']
					}
				}],
				series: [{
					type: 'map',
					mapType: 'china',
					coordinateSystem: "geo",
					roam: false,
					label: {
						normal: {
							show: false
						},
						emphasis: {
							show: false
						}
					},
					top: 30,
					showLegendSymbol: false,
					data: provenceInfo,
					zoom: 1.2,
					emphasis: {
						itemStyle: {
							areaColor: null
						}
					}
				}, ]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		}
	}
})

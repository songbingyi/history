//index.js
//获取应用实例
var app = getApp();
const postdata = require('../../datas/datas.js')

Page({
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '看看你现在正位于长安城的哪里吧',
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    },
    data: {
    },
    onReady:function(){
       
    },
    onLoad: function () {
       
       
        var that = this;
        wx.getLocation({
            type: 'gcj02',//不然会产生偏差和二次定位
            success: function (res) {

                var latitude,longitude; 
                if (res.longitude < 108.84668 || res.longitude > 109.03422 || res.latitude > 34.3671 || res.latitude<34.1618){
                    latitude = 34.265725; 
                    longitude = 108.95346;
                } else {
                    latitude= res.latitude;
                    longitude = res.longitude;}
               // console.log(latitude,longitude)
                var content = postdata.postlist;
                var markers = [];  
                for (var i = 0; i < content.length;i++){
                    var markersData = {}//不能写到外面
                    markersData.longitude = content[i].x;
                    markersData.latitude = content[i].y;
                    markersData.iconPath = "/pages/imgs/location.png";
                    markersData.width = 20;
                    markersData.height = 30;
                    markersData.id = i;
                   // markers[i] = markersData;
                    markers.push(markersData)
                   // console.log(markers);
                }
              
                
                var circleData = [
                    {
                        latitude: res.latitude,
                        longitude: res.longitude,//经度
                        // color: '#FF0000DD',
                        fillColor: '#000000AA',
                        radius: 1500,
                        strokeWidth: 1
                    }
                ];
                that.setData({ markers, longdata: res.longitude, latidata: res.latitude, cdata: circleData });
                var dataArray = [];
                for (var i = 0; i < content.length; i++) {
                    var gapx = Math.abs((content[i].x - longitude) * 1000);
                    var gapy = Math.abs((content[i].y - latitude) * 1000)
                    if (gapx < 15 && gapy < 15) {
                        dataArray.push(content[i])
                    }
                }
         
                that.setData({ dataArray });//获取LIST数据
            }
        })

    },  //ONLOAD
    markertap:function(e){//切换图标颜色
        var longdata = this.data.markers[e.markerId].longitude;
        var latidata = this.data.markers[e.markerId].latitude;
       // console.log(longdata, latidata)//test输出点击marker的坐标
        var markerstring = "markers["+e.markerId+"].iconPath";//修改setdata数组里单个属性的方法 先把目标转化成string
        if (app.globalData.g_switchID == e.markerId) {    
        }
        if (app.globalData.g_switchID !== null && app.globalData.g_switchID !== e.markerId){
           var markerrt = "markers[" + app.globalData.g_switchID + "].iconPath";
                app.globalData.g_switchID = e.markerId;
            } else{
                app.globalData.g_switchID = e.markerId;
        }
          
        this.setData({ [markerstring]: "/pages/imgs/markerr.png", [markerrt]: "/pages/imgs/location.png"});

        var dataid = e.markerId;
        var dataArray = [];
        var content = postdata.postlist;
        dataArray.push(content[dataid]);
        this.setData({ dataArray } );//点击markers更新数据
    }//切换图标颜色OVER
    ,

   

})

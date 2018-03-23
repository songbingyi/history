//index.js
//获取应用实例
const app = getApp();
const postdata = require('../../datas/datas.js')

Page({
    data: {
    },
    onLoad: function () {
        var that = this;

        wx.getLocation({
            success: function (res) {
                var latitude = res.latitude;
                var longitude = res.longitude;
                var content = postdata.postlist;
                var markers = [];
                
                for (var i = 0; i < content.length;i++){
                    var markersData = {}//不能写到外面
                    markersData.longitude = content[i].x;
                    markersData.latitude = content[i].y;
                    markersData.iconPath = "/pages/imgs/1.jpg";
                    markersData.width = 20;
                    markersData.height = 20;
                    markersData.id = i;
                   // markers[i] = markersData;
                    markers.push(markersData)
                   // console.log(markers);
                }
               // console.log(markers);
                
                var circleData = [
                    {
                        latitude: latitude,
                        longitude: longitude,//经度
                        // color: '#FF0000DD',
                        fillColor: '#000000AA',
                        radius: 2000,
                        //strokeWidth: 1
                    }
                ];

                that.setData({ markers,longdata: longitude, latidata: latitude, circlesd: circleData });

                var dataArray = [];
                for (var i = 0; i < content.length; i++) {
                    var gapx = Math.abs((content[i].x - longitude) * 1000);
                    var gapy = Math.abs((content[i].y - latitude) * 1000)
                    if (gapx < 400 && gapy < 400) {
                        dataArray.push(content[i])
                    }
                }
                that.setData({ dataArray });//获取LIST数据
            }
        }),
        this.mapCtx = wx.createMapContext('myMap');
    },  //ONLOAD

  /**  getCenterLocation: function () {
        var that = this;
        this.mapCtx.getCenterLocation({
            success:  function (res) {
                var markers = [{
                    iconPath: "/pages/imgs/1.jpg",
                    id: 0,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    width: 50,
                    height: 50
                }];
                that.setData({markers, longdata: res.longitude, latidata: res.latitude});
            }
        })
        setTimeout(that.mapCtx.moveToLocation(),1000)
    },**/



})

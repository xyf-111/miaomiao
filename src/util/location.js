// 第一行需要加上 import AMap from 'AMap' ，不然会报 'AMap' is not defined 这个错
// import AMap from 'AMap' 
export const getLocation = (box, callback) => {
    var map = new AMap.Map(box, {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13
    });
    //实例化城市查询类
    var citysearch = new AMap.CitySearch();
    //自动获取用户IP，返回当前城市
    citysearch.getLocalCity(function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
                var cityinfo = result.city;
                var citybounds = result.bounds;
                callback(cityinfo)
                //地图显示当前城市
                map.setBounds(citybounds);
            }
        } else {
            callback(result.info)
        }
    });
}

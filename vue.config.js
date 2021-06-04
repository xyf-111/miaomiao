//对于跨域访问的情况，配置反向代理
// 如果export default写法不支持的话，换成ECMA6的写法：
module.exports = {
    devServer: {
        proxy: {
            '/ajax': {
                target: 'https://m.maoyan.com',
                changeOrigin: true
            }
        }
    }
}
// export default ({
//     devServer: {
//         proxy: {
//             '/ajax': {
//                 target: 'https://m.maoyan.com',
//                 changeOrigin: true
//             }
//         }
//     }
// })
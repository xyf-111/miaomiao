export default {
    path: '/movie',
    component: () => import('@/views/Movie'),/* @表示src的文件夹 */
    children: [
        {
            path: 'city',
            component: () => import('@/components/City')
        },
        {
            path: 'nowplaying',
            component: () => import('@/components/Nowplaying')
        },
        {
            path: 'commingsoon',
            component: () => import('@/components/Commingsoon')
        },
        {
            path: 'search',
            component: () => import('@/components/Search')
        },
        {
            // 配置动态路由
            path: 'detail/nowplaying/:movieId',
            components: {
                // 为了解决路由切换时，切换前的路由消失的问题，可以再配置路由，为了解决切换前的路由有多个的问题，可以设置两次默认路由
                default: () => import('@/components/Nowplaying'),
                detail: () => import('@/views/Movie/Detail')
            },
            // 替代 this.$routes.params.movieId 获取路由的方式：
            // 下面的写法是配合上述components的写法，如果不用配合的话，直接写成： props：true
            props: {
                detail: true
            }
        },
        {
            path: 'detail/commingsoon/:movieId',
            components: {
                default: () => import('@/components/Commingsoon'),
                detail: () => import('@/views/Movie/Detail')
            },
            props: {
                detail: true
            }
        },
        {
            path: '/',
            redirect: 'nowplaying'
        }
    ]
}
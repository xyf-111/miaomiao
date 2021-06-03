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
            path: '/',
            redirect: 'nowplaying'
        }
    ]
}
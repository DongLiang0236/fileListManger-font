/**
 * Created by litao on 2018/10/25.
 */
export default function (redirect) {

    const load = require('./import/_import_' + process.env.NODE_ENV);

    return {
        other: [
            {
                name: 'error',
                path: '/error/:errorPageRoute?',
                props: true,
                component: load('views/error/index'),
                meta: {permissionCode: '*'}
            },
            {
                name: 'noAuthority',
                path: '/authority/401',
                props: true,
                component: load('views/error/no-authority'),
                meta: {permissionCode: '*'}
            }
        ],
        permission: [
            {
                name: '/',
                path: '/',
                component: load('views/layout/index'),
                redirect,
                children: [
                    {
                        name: 'index',
                        path: 'index',
                        component: load('views/index/index'),
                        meta: {title: '首页', permissionCode: 'index', icon: 'icon-zhuye'}
                    },
                    {
                        name: 'help',
                        path: 'http://www.baidu.com',
                        meta: {title: '帮助', permissionCode: 'help', icon: 'icon-zhuye'}
                    },
                    {
                        name: 'system',
                        path: 'system',
                        component: load('views/system/index'),
                        meta: {title: '系统设置', permissionCode: 'system', icon: 'icon-zhuye'},
                        redirect,
                        children: [
                            {
                                name: 'dict',
                                path: 'dict',
                                component: load('views/system/dict/index'),
                                meta: {title: '字典管理', permissionCode: 'dict', icon: 'icon-zhuye'},
                            }
                        ]
                    },
                    {
                        name: 'file',
                        path: 'file',
                        component: load('views/file/index'),
                        meta: {title: '文件配置', permissionCode: 'file', icon: 'icon-zhuye'},
                        redirect,
                        children: [
                            {
                                name: 'list',
                                path: 'list',
                                component: load('views/file/list/list'),
                                meta: {title: '文件管理', permissionCode: 'list', icon: 'icon-zhuye'},
                            }
                        ]
                    }
                ]
            }
        ]
    }
}

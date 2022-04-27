import { defineConfig } from 'dumi';

// 图片路径
let BaseUrl = '/images/';

// 通用组件路由
const commonMenu = ['Common/TextTip/index.md', 'Common/Text/index.md', 'Common/LrcMaker/index.md'];
// hooks
const hooksMenu = ['Hooks/useInterval/index.md'];
// 公共方法
const functionMenu = [];
// 业务组件路由
const specialMenu = [];

export default defineConfig({
    title: 'tsuki2478',
    mode: 'site', // site: 站点模式（导航头 + 左侧菜单 + 右侧内容）。 doc：文档
    favicon: BaseUrl + 'svg.png',
    logo: BaseUrl + 'svg.png',
    outputPath: 'docs-dist',
    description: '前端组 《组件库》 文档',
    // 指定前缀
    // base: `/${repo}/`,
    // publicPath: `/${repo}/`,
    mfsu: {},
    hash: true,
    dynamicImport: {},
    manifest: {
        // 内部发布系统规定必须配置
        fileName: 'manifest.json',
    },
    // 主题
    theme: {
        '@c-primary': '#9b83ff',
    },
    navs: [
        {
            title: '组件',
            path: '/components',
        },

        {
            title: 'GitLab',
            path: 'https://github.com/tsuki2478/react-components',
        },
    ],
    // 需要自定义侧边菜单的路径，没有配置的路径还是会使用自动生成的配置
    menus: {
        '/components': [
            {
                title: '通用组件',
                path: '/components/common',
                children: commonMenu,
            },
            {
                title: '业务组件',
                path: '/components/special',
                children: specialMenu,
            },
            {
                title: 'hooks',
                path: '/components/hooks',
                children: hooksMenu,
            },
            {
                title: '公共方法',
                path: '/components/function',
                children: functionMenu,
            },
        ],
    },
    lessLoader: { javascriptEnabled: true },
    //  按需加载 antd
    extraBabelPlugins: [
        [
            'babel-plugin-import',
            {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            },
        ],
    ],
});

// more config: https://d.umijs.org/config

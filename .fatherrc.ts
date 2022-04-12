import commonjs from '@rollup/plugin-commonjs';

export default {
    esm: 'rollup',
    cjs: 'rollup',
    // lessInRollupMode: true, // rollup 模型 做 less编译
    // pkgs: [
    // 组件依赖构建顺序， 例如 a组件依赖于b组件，那么需要先编译 b,在编译a,则 这里可以控制组件编译顺序
    // ],
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
    extraRollupPlugins: [commonjs()],
    entry: 'src/index.ts',

    // target: 'browser',
    // autoprefixer: {
    //     browsers: ['ie>9', 'Safari >= 6'],
    // },
    // esm: 'babel',
    // cjs: 'babel',
    // runtimeHelpers: true,
    // extraBabelPlugins: [
    //     [
    //         'babel-plugin-import',
    //         {
    //             libraryName: 'antd',
    //             libraryDirectory: 'es',
    //             style: true,
    //         },
    //     ],
    // ],
    // lessInBabelMode: true, // babel 模式下做 less 编译
};

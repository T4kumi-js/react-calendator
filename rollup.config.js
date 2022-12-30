const PeerDepsExternalPlugin = require('rollup-plugin-peer-deps-external');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const babel = require('@rollup/plugin-babel');
const terser = require('@rollup/plugin-terser');
const postcss = require('rollup-plugin-postcss');

const nodeResolveConfig = {
    extensions: [
        '.js',
        '.jsx'
    ]
};

const babelConfig = {
    exclude: 'node_modules/**',
    presets: [
        '@babel/preset-react'
    ],
    babelHelpers: 'bundled'
};

const postCSSConfig = {
    minimize: true
};

module.exports = [
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/cjs/react-calendator.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/esm/react-calendator.js',
                format: 'esm',
                sourcemap: true
            },
            {
                file: 'dist/umd/react-calendator.js',
                format: 'umd',
                name: 'ReactCalendator',
                sourcemap: true
            }
        ],
        plugins: [
            PeerDepsExternalPlugin(),
            nodeResolve(nodeResolveConfig),
            commonjs(),
            babel(babelConfig),
            postcss(postCSSConfig)
        ]
    },
    {
        input: './src/index.js',
        output: [
            {
                file: 'dist/cjs/react-calendator.min.js',
                format: 'cjs',
                sourcemap: true
            },
            {
                file: 'dist/esm/react-calendator.min.js',
                format: 'esm',
                sourcemap: true
            },
            {
                file: 'dist/umd/react-calendator.min.js',
                format: 'umd',
                name: 'ReactCalendator',
                globals: {
                    react: 'React'
                },
                sourcemap: true
            }
        ],
        plugins: [
            PeerDepsExternalPlugin(),
            nodeResolve(nodeResolveConfig),
            commonjs(),
            babel(babelConfig),
            postcss(postCSSConfig),
            terser()
        ]
    }
];

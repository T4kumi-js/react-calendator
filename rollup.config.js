import { terser } from 'rollup-plugin-terser';
import PeerDepsExternalPlugin from 'rollup-plugin-peer-deps-external';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

const packageJson = require('./package.json');

export default {
    input: './src/index.js',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        },
        {
            file: packageJson.browser,
            format: 'umd',
            name: 'ReactCalendator',
            sourcemap: true
        }
    ],
    plugins: [
        PeerDepsExternalPlugin(),
        nodeResolve({
            extensions: [
                '.js',
                '.jsx'
            ]
        }),
        commonjs(),
        babel({
            exclude: 'node_modules/**',
            presets: [
                '@babel/preset-react'
            ],
            babelHelpers: 'bundled'
        }),
        postcss({
            minimize: true
        }),
        terser()
    ]
};

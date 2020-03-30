import typescript from 'rollup-plugin-typescript2';
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url';
import commonjs from "@rollup/plugin-commonjs";

import pkg from './package.json'

export default {
    input: './src/index.tsx',
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true
        }
    ],
    plugins: [
        external(),
        url({exclude: ['**/*.svg']}),
        resolve({
            browser: true
        }),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true
        }),
        commonjs({
            include: ["node_modules/**"],
            namedExports: {
                "node_modules/react/react.js": [
                    "Children",
                    "Component",
                    "PropTypes",
                    "useState",
                    "createElement"
                ],
                "node_modules/react-dom/index.js": ["render"]
            }
        })
    ]
}

import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
    // ESM build
    {
        input: 'src/vanilla-state.ts',
        output: {
            file: 'dist/vanilla-state.esm.js',
            format: 'es'
        },
        plugins: [typescript()]
    },
    // UMD build (minified)
    {
        input: 'src/vanilla-state.ts',
        output: {
            file: 'dist/vanilla-state.min.js',
            format: 'umd',
            name: 'VanillaState',
            exports: 'default'
        },
        plugins: [typescript(), terser()]
    },
    // CommonJS build
    {
        input: 'src/vanilla-state.ts',
        output: {
            file: 'dist/vanilla-state.cjs.js',
            format: 'cjs',
            exports: 'default'
        },
        plugins: [typescript()]
    }
];
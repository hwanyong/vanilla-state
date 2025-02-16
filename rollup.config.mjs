import terser from '@rollup/plugin-terser';

export default [
    // ESM build
    {
        input: 'src/vanilla-state.js',
        output: {
            file: 'dist/vanilla-state.esm.js',
            format: 'es'
        }
    },
    // UMD build (minified)
    {
        input: 'src/vanilla-state.js',
        output: {
            file: 'dist/vanilla-state.min.js',
            format: 'umd',
            name: 'VanillaState',
            exports: 'default'
        },
        plugins: [terser()]
    },
    // CommonJS build
    {
        input: 'src/vanilla-state.js',
        output: {
            file: 'dist/vanilla-state.cjs.js',
            format: 'cjs',
            exports: 'default'
        }
    }
];
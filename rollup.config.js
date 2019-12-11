import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

const preprocess = {
    markup({ content }) {
        const code = content.replace(/<icon id="(.+?)" ?\/>/g, (_, $1) => {
            const href = (production ? '#icon-' : '/icons.svg#') + `${$1}`;
            return `<svg class="icon icon-${$1}"><use xlink:href="${href}"></use></svg>`;
        })
        return {code};
    },
};

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            dev: !production,
            preprocess,
            css(css) {
                css.write('public/build/bundle.css');
            }
        }),

        resolve({
            browser: true,
            dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
        }),

        // For Waveform
        replace({ __VERSION__: "'3.2.0'"}),
        babel({plugins: ['@babel/plugin-proposal-class-properties']}),

        commonjs(),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        !production && livereload('public'),
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};

function serve() {
    let started = false;
    function writeBundle() {
        if (started)
            return;

        started = true;
        require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
            stdio: ['ignore', 'inherit', 'inherit'],
            shell: true
        });
    }

    return {writeBundle};
}

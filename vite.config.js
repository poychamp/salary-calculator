// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({

    test: {
        include: ['./resources/js/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        // enable jest-like global test APIs
        globals: true,
        // simulate DOM with happy-dom
        // (requires installing happy-dom as a peer dependency)
        environment: 'happy-dom'
    },
    plugins: [vue()]
})
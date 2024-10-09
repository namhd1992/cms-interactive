import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/*import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';*/

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react() ]
    
    //plugins: [react(), NodeGlobalsPolyfillPlugin({
    //    buffer: true
    //})],
    //resolve: {
    //    alias: {
    //        buffer: 'buffer/'
    //    }
    //}
})

import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
    base: './',
    build: {
        lib: {
            entry: './src/GradingPyramid.ts',
            formats: ['es', 'umd'],
            outDir: 'dist',
            fileName: 'index',
            name: 'GradingPyramid',
        }
    },
    define: {
        'process.env.NODE_ENV': '"production"'
    },
    plugins: [dts({
        include: ['./src/GradingPyramid.ts'],
        outDir: 'dist',
        beforeWriteFile: (filePath, content) => ({
            filePath: filePath.replace('GradingPyramid.d.ts', 'index.d.ts'),
            content,
        }),
    })],
})
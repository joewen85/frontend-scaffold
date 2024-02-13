import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 这里可更改env文件的路径
  // envDir: '.src/env'
})
// .env.dev
// .env.sit
// .env.prod
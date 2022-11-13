import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://github.com/vitejs/vite/issues/5743
function maybeCloseStdin(command: 'build' | 'serve') {
  if (command === 'build') return
  process.stdin.on('close', () => { process.exit(0) })
  process.stdin.resume()
}

export default defineConfig(({ command }) => {
  maybeCloseStdin(command)

  return {
    build: {
      outDir: 'build'
    },
    plugins: [react()]
  }
})

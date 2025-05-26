import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
export default defineConfig({
  plugins: [react(), visualizer({ open: true })],
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-bootstrap',
      '@hello-pangea/dnd'
    ]
  },
 exclude: ['react-toastify']
});

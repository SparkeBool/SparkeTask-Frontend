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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react';
            if (id.includes('bootstrap')) return 'bootstrap';
            if (id.includes('framer-motion')) return 'framer-motion';
            if (id.includes('react-toastify')) return 'react-toastify';
            if (id.includes('@hello-pangea/dnd')) return 'dnd';
            return 'vendor'; // fallback for other libraries
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // (optional) Adjust warning limit (default is 500 KB)
  },
});

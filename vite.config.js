import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@scss': path.resolve(__dirname, 'src/scss'),
			'@views': path.resolve(__dirname, 'src/views'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@store': path.resolve(__dirname, 'src/store'),
		},
	},
});

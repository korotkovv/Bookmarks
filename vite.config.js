import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import glob from 'glob';

// https://vitejs.dev/config/

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		base: '/',

		build: {
			emptyOutDir: true,
			outDir: path.join(__dirname, process.env.VITE_DIST_DIR),
			rollupOptions: {
				input: glob.sync(path.resolve(__dirname, './src', '*.html')),
			},
		},
		plugins: [vue()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, './src'),
			},
		},
		server: {
			host: process.env.VITE_DEV_SERVER_HOST,
			port: process.env.VITE_DEV_SERVER_PORT,
			proxy: {
				'/documentation#/': process.env.VITE_HTTP_BACKEND_HOST,
				'/api': process.env.VITE_HTTP_BACKEND_HOST,
			},
		},
	});
};

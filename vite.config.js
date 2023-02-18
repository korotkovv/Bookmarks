import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		base: '/',
		publicDir: path.join(__dirname, './public'),
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

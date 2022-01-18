import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

//=> Vite config
export default defineConfig({
	//=> 插件
	plugins: [tsconfigPaths(), reactRefresh(), svgr()],
	server: {
		port: 30240 //=> Dev 监听端口 | '一般在 3000 绑定失败时设置'
	}
})

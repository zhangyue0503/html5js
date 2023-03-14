import { defineConfig, loadEnv } from "vite";
import viteBaseConfig from "./vite.base.config";
import viteProdConfig from "./vite.prod.config";
import viteDevConfig from "./vite.dev.config";

const envResolver = {
    "build": () => {
        console.log('生产环境')
        return ({ ...viteBaseConfig, ...viteProdConfig })
    },
    "serve": () => {
        console.log('开发环境')
        return Object.assign({}, viteBaseConfig, viteDevConfig)
    }
}

export default defineConfig(({ command, mode }) => {
    // optimizeDeps: {
    //     exclude: [],
    // }
    console.log('command', command, envResolver[command])
    // console.log('process.env', process.env)
    const env = loadEnv(mode, process.cwd(), '')
    console.log(env)
    return envResolver[command]()
    // if (command === "build") {

    // } else {

    // }
})
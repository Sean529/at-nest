import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { CLONE_PATH, GIT_INFO, GIT_BRANCHES, PROJECT_NAME } from '../private/constant'
import { fetch, execPromise } from '../utils/promise'

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
  async test() {
    const { error } = await execPromise(`git clone ${CLONE_PATH}`, { cwd: PROJECT_NAME })
    console.log('%c AT-[ error ]-11', 'font-size:13px; background:#de4307; color:#f6d04d;', error);
  }
  async clone() {
    const { error } = await execPromise(`git clone ${CLONE_PATH}`)
    return error ? '项目已存在' : '下载成功'
  }
  async getGitInfo() {
    return await fetch(this.httpService, 'get', GIT_INFO)
  }
  async getBranches() {
    return await fetch(this.httpService, 'get', GIT_BRANCHES)
  }
  async checkout() {
    // TODO: 分支名传入
    // TODO: 本地若已有该分支则删除从远程拉取
    const name = 'test'
    // const data = await execPromise(`git checkout -b ${name} origin/${name}; git pull`, { cwd: PROJECT_NAME })
    const data = await execPromise(`git checkout ${name}; git pull`, { cwd: PROJECT_NAME })
    console.log('%c AT-[ data ]-22', 'font-size:13px; background:#de4307; color:#f6d04d;', data);
  }
  async build() {
    // 先删除依赖，再安装依赖
    // 执行 build 命令
    // const { error } = await execPromise(`rm -rf node_modules`, { cwd: PROJECT_NAME })
    // 安装依赖
    // const { error } = await execPromise(`pnpm i`, { cwd: PROJECT_NAME })
    // node 版本 v16 跟 nest项目执行的的 node 环境有关
    // 执行脚本 - 开发版本
    // const data = await execPromise(`node -v`, { cwd: PROJECT_NAME })
    const { error } = await execPromise(`npm run build:weapp:preview`, { cwd: PROJECT_NAME })
    console.log('%c AT-[ error ]-35', 'font-size:13px; background:#de4307; color:#f6d04d;', error);
  }
  async buildPreview() {
    const { error } = await execPromise(`npm run build:weapp:preview`, { cwd: PROJECT_NAME })
    console.log('%c AT-[ error ]-35', 'font-size:13px; background:#de4307; color:#f6d04d;', error);
  }
  async dev() {

  }
}


// git checkout test
// 选择环境
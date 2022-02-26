import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { CLONE_PATH, GIT_INFO, GIT_BRANCHES } from '../private/constant'
import { fetch, execPromise } from '../utils/promise'

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
  async clone() {
    const data = await execPromise(`git clone ${CLONE_PATH}`)
    return data ? '项目已存在' : '下载成功'
  }
  async getGitInfo() {
    return await fetch(this.httpService, 'get', GIT_INFO)
  }
  async getBranches() {
    return await fetch(this.httpService, 'get', GIT_BRANCHES)
  }
}

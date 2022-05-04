import { Injectable } from '@nestjs/common';
import { existsSync, access } from 'fs';

@Injectable()
export class DeployService {
  async deploy(query) {
    const { env, version, channel } = query;
    // 判断项目是否存在本地
    // 目录判断
    const hasCode = await existsSync('code');
    console.log(
      '%c AT-[ hasCode ]-116',
      'font-size:13px; background:#de4307; color:#f6d04d;',
      hasCode,
    );
    if (hasCode) {
    }
    return query;
  }
}

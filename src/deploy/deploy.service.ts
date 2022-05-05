import { Injectable } from '@nestjs/common';
import { existsSync, readFileSync } from 'fs';
import { CLONE_PATH, PROJECT_NAME } from 'private/constant';
import { execPromise } from 'utils/promise';

@Injectable()
export class DeployService {
  async deploy(query) {
    const { env, version, channel, branch = 'test' } = query;
    // 判断项目是否存在本地
    // 目录判断
    const hasCode = await existsSync('code');
    if (hasCode) {
      const hasTaro = await existsSync('./code/taro');
      if (hasTaro) {
        const data = await readFileSync('./code/taro/package.json', {
          encoding: 'utf8',
        });
        // 判断文件是否存在
        if (data) {
          const { stdout } = await execPromise(
            'git symbolic-ref --short HEAD',
            {
              cwd: PROJECT_NAME,
            },
          );

          console.log(
            '%c AT-[ stdout ]-22',
            'font-size:13px; background:#de4307; color:#f6d04d;',
            stdout,
          );
          console.log(
            '%c AT-[ stdout.trim() ]-34',
            'font-size:13px; background:#de4307; color:#f6d04d;',
            stdout.trim(),
          );
          console.log(
            '%c AT-[ branch === stdout.trim() ]-39',
            'font-size:13px; background:#de4307; color:#f6d04d;',
            branch === stdout.trim(),
          );
          if (branch === stdout.trim()) {
            const { stderr } = await execPromise('git pull', {
              cwd: PROJECT_NAME,
            });
            console.log(
              '%c AT-[ stderr ]-35',
              'font-size:13px; background:#de4307; color:#f6d04d;',
              stderr,
            );
            // 没有错误就表示成功
            if (!stderr) {
              //TODO: 检查缓存中的 package.json 文件的 hash 值，若不一致，则更新
              const hasNodeModules = await existsSync(
                './code/taro/node_modules',
              );
              console.log(
                '%c AT-[ hasNodeModules ]-36',
                'font-size:13px; background:#de4307; color:#f6d04d;',
                hasNodeModules,
              );
              if (hasNodeModules) {
                const upload = 'npm run build:weapp:upload';
                // const preview = 'npm run build:weapp:preview';
                const d = await execPromise(upload, {
                  cwd: PROJECT_NAME,
                });
                console.log(
                  '%c AT-[ d ]-39',
                  'font-size:13px; background:#de4307; color:#f6d04d;',
                  d,
                );
                return d;
              } else {
                const d = await execPromise('yarn', {
                  cwd: PROJECT_NAME,
                });
                return d;
              }
            } else {
              // Please make sure you have the correct access rights and the repository exists.
              return stderr;
            }
          } else {
            const { stderr } = await execPromise('git checkout test', {
              cwd: PROJECT_NAME,
            });
            return stderr;
          }
        }
      } else {
        const dd = await execPromise(`cd code; git clone ${CLONE_PATH}`);
        console.log(
          '%c AT-[ dd ]-59',
          'font-size:13px; background:#de4307; color:#f6d04d;',
          dd,
        );
        return dd;
      }
    } else {
      const { error } = await execPromise(`cd code; git clone ${CLONE_PATH}`);
      return error ? '项目已存在' : '下载成功';
    }
    return query;
  }
}

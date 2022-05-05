import { exec, ExecOptions } from 'child_process';
import { HttpService } from '@nestjs/axios';

function fetch(
  httpService: HttpService,
  meth: string,
  path: string,
): Promise<any> {
  return new Promise((resolve) => {
    httpService[meth](path).subscribe((response) => {
      resolve(response.data);
    });
  });
}

function execPromise(command: string, options?: ExecOptions): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      !options && (options = {});
      exec(command, options, (error, stdout, stderr) => {
        resolve({ error, stdout, stderr });
      });
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export { fetch, execPromise };

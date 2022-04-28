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
      if (options) {
        console.log(
          '%c AT-[ options ]-16',
          'font-size:13px; background:#de4307; color:#f6d04d;',
          options,
        );
        console.log(
          '%c AT-[ command ]-18',
          'font-size:13px; background:#de4307; color:#f6d04d;',
          command,
        );
        exec(command, options, (error, stdout, stderr) => {
          console.log(
            '%c AT-[ error, stdout, stderr ]-20',
            'font-size:13px; background:#de4307; color:#f6d04d;',
            error,
            stdout,
            stderr,
          );
          resolve({ error, stdout, stderr });
        });
      } else {
        exec(command, (error, stdout, stderr) => {
          resolve({ error, stdout, stderr });
        });
      }
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}

export { fetch, execPromise };

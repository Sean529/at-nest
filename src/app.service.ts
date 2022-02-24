import { Injectable } from '@nestjs/common';
import { exec } from 'child_process'
import { HttpService } from '@nestjs/axios'

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) { }
  clone(): any {
    exec(`git clone ${path}`, (error, stdout, stderr) => {
    })
  }
  getGitInfo() {
    this.httpService.get(branches).subscribe((response) => {
      return response.data;
    });
    return '23'
  }

  getBranches() {
    this.httpService.get(branches).subscribe((response) => {
      return response.data;
    });
    return '23'
  }
}

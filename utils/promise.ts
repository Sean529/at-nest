import { exec } from "child_process";
import { HttpService } from '@nestjs/axios'

function fetch(httpService: HttpService, meth: string, path: string): Promise<any> {
	return new Promise((resolve) => {
		httpService[meth](path).subscribe((response) => {
			resolve(response.data)
		});
	})
}

function execPromise(path: string): Promise<any> {
	return new Promise((resolve, reject) => {
		try {
			exec(path, (error) => {
				resolve(error)
			})
		} catch (e) {
			console.log(e)
			reject(e)
		}
	})
}

export {
	fetch,
	execPromise
} 
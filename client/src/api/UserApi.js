import { requestHttp, httpMethodType } from "@/api/ApiAggregator";
import { registerCallback, fetchResponse } from "@/usecase/UserApiInteractor";

const URL = '/api/users'
const HTTP_STATUS_SUCCESS = 200

const userApiCallback = {
	fetchRequest: async () => {
		const payload = {
			method: httpMethodType.GET,
			url: URL,
			baseURL: 'http://localhost:5000',
			headers: {},
			params: {},
			data: {}
		}

		const {status, data} = await requestHttp(payload).catch(e => {
			throw e
		})

		if(status === HTTP_STATUS_SUCCESS) {
			fetchResponse(
				{
					users: data.users
				}
			)
		}
	},
}

const init = () => {
	registerCallback(userApiCallback)
}

export {init}

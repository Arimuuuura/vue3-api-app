import { requestHttp, httpMethodType } from "@/api/ApiAggregator";
import { registerCallback, fetchResponse } from "@/usecase/AuthInteractor";

const URL = '/api/get-access-token'
const HTTP_STATUS_SUCCESS = 200

const testApiCallback = {
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
		console.log(data);
		return data
	},
	accessTokenRequest: async (code) => {
		const payload = {
			method: httpMethodType.POST,
			url: URL,
			baseURL: 'http://localhost:5000',
			headers: {},
			data: {code},
		}

		const {status, data} = await requestHttp(payload).catch(e => {
			throw e
		})

		if(status === HTTP_STATUS_SUCCESS) {
			return await fetchResponse(data.access_token)
		}
	}
}

const init = () => {
	registerCallback(testApiCallback)
}

export {init}

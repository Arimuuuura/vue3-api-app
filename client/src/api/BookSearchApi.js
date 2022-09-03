import { requestHttp, httpMethodType } from "@/api/ApiAggregator";
import { registerCallback, fetchResponse } from "@/usecase/BookSearchApiInteractor";

const URL = '/api/search'
const HTTP_STATUS_SUCCESS = 200

const bookSearchApiCallback = {
	getSearchResult: async (keyword) => {
		const payload = {
			method: httpMethodType.GET,
			url: URL,
			baseURL: 'http://localhost:5000',
			headers: {},
			params: {
				keyword: keyword
			},
			data: {}
		}

		const {status, data} = await requestHttp(payload).catch(e => {
			throw e
		})

		if(status === HTTP_STATUS_SUCCESS) {
			fetchResponse(
				{
					result: data.result
				}
			)
		}
	},
}

const init = () => {
	registerCallback(bookSearchApiCallback)
}

export {init}

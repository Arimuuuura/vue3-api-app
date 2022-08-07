import axios from "axios";
import { registerHttpCallback } from '@/api/ApiAggregator'

const httpCallback = {
	requestHttp: async ({method, url, baseURL, headers, params, data}) => {
		const config = {
			method: method,
			url: url,
			baseURL: baseURL,
			headers: headers,
			params: params,
			data: data
		}

		const response = await axios.request(config).catch(e => {
			console.log(e);
			throw e;
		})

		// TODO 200 以外の場合のエラーハンドリング
		return {
			status: response.status,
			data: response.data
		}
	}
}

const init = () => {
	registerHttpCallback(httpCallback)
}

export {init}

import { requestHttp, httpMethodType } from "@/api/ApiAggregator";
import { registerCallback, fetchResponse, updateResponse } from "@/usecase/FavoriteBookmarkInteractor";

const URL = '/api/favorite-bookmark'
const HTTP_STATUS_SUCCESS = 200

const favoriteBookmarkApiCallback = {
	fetchRequest: async (code) => {
		const payload = {
			method: httpMethodType.GET,
			url: URL,
			baseURL: 'http://localhost:5000',
			headers: {},
			params: {code},
			data: {}
		}

		const {status, data} = await requestHttp(payload).catch(e => {
			throw e
		})

		if(status === HTTP_STATUS_SUCCESS) {
			fetchResponse(
				{
					items: data.myBookmarkList,
					summary: data.summary,
				}
			)
		}
	},
	updateFavoriteRequest: async (action, code, id) => {
		const payload = {
			method: httpMethodType.POST,
			url: URL,
			baseURL: 'http://localhost:5000',
			headers: {},
			params: {},
			data: {action, code, id}
		}

		const {status, data} = await requestHttp(payload).catch(e => {
			throw e
		})

		if(status === HTTP_STATUS_SUCCESS) {
			updateResponse(
				{
					response: 'success'
				}
			)
		}
	},
}

const init = () => {
	registerCallback(favoriteBookmarkApiCallback)
}

export {init}

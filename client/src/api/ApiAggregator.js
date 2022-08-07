const httpCallbackList = []

const httpMethodType = {
	GET: 'get',
	POST: 'post',
	PUT: 'put',
	DELETE: 'delete'
}

const registerHttpCallback = (callback) => {
	if(!httpCallbackList.includes(callback)) {
		httpCallbackList.push(callback)
	}
}

const requestHttp = async ({method, url, baseURL, headers, params, data}) => {
	let response = {}
	for (const callback of httpCallbackList) {
		response = await callback.requestHttp(
			{
				method,
				url,
				baseURL,
				headers,
				params,
				data
			}
		)
	}
	return response
}

export {
	registerHttpCallback,
	httpMethodType,
	requestHttp
}
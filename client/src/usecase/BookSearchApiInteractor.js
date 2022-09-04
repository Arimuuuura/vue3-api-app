const callbackList = []

const registerCallback = callback => {
	if(!callbackList.includes(callback)) {
		callbackList.push(callback)
	}
}

const fetchRequest = async () => {
	console.log('aa');
	for(const callback of callbackList) {
		if(callback.fetchRequest) {
			await callback.fetchRequest()
		}
	}
}

const fetchResponse = async ({result}) => {
	for(const callback of callbackList) {
		if(callback.fetchResponse) {
			await callback.fetchResponse({result})
		}
	}
}

const getSearchResult = async (keyword) => {
	for(const callback of callbackList) {
		if(callback.getSearchResult) {
			await callback.getSearchResult(keyword)
		}
	}
}

export {
	registerCallback,
	fetchRequest,
	fetchResponse,
	getSearchResult
}

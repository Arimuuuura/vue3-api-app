const callbackList = []

const registerCallback = callback => {
	if(!callbackList.includes(callback)) {
		callbackList.push(callback)
	}
}

const fetchRequest = async () => {
	for(const callback of callbackList) {
		if(callback.fetchRequest) {
			await callback.fetchRequest()
		}
	}
}

const fetchResponse = async (data) => {
	for(const callback of callbackList) {
		if(callback.fetchResponse) {
			await callback.fetchResponse(data)
		}
	}
}

const accessTokenRequest = async (code) => {
	for(const callback of callbackList) {
		if(callback.accessTokenRequest) {
			await callback.accessTokenRequest(code)
		}
	}
}

export {
	registerCallback,
	fetchRequest,
	fetchResponse,
	accessTokenRequest
}

const callbackList = []

const registerCallback = callback => {
	if(!callbackList.includes(callback)) {
		callbackList.push(callback)
	}
}

const fetchRequest = async (code) => {
	for(const callback of callbackList) {
		if(callback.fetchRequest) {
			await callback.fetchRequest(code)
		}
	}
}

const fetchResponse = async ({items, summary}) => {
	for(const callback of callbackList) {
		if(callback.fetchResponse) {
			await callback.fetchResponse({items, summary})
		}
	}
}

export {
	registerCallback,
	fetchRequest,
	fetchResponse,
}
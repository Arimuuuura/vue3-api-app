import { fetchRequest, registerCallback, getSearchResult } from '@/usecase/BookSearchApiInteractor'
import store from '@/view/store/index'

export const init = () => {
	console.log('Hi');
}

const setResult = () => {
	const bookSearchInteractorCallback = {
		fetchResponse: ({result}) => {
			store.commit('BookSearchState/setResult', {result})
		}
	}

	registerCallback(bookSearchInteractorCallback)
}

export default {
	namespaced: true,
	state: () => {
		return {
			keyword: "react",
			result: [{}]
		}
	},
	mutations: {
		setResult(state, {result}) {
			state.result = result
		},
	},
	actions: {
		fetch() {
			fetchRequest()
		},
		async getSearchResult(_, keyword) {
			getSearchResult(keyword)
			await setResult()
		}
	}
}

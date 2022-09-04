import { fetchRequest, registerCallback, getSearchResult } from '@/usecase/BookSearchApiInteractor'
import store from '@/view/store/index'

export const init = () => {
	const bookSearchInteractorCallback = {
		fetchResponse: async ({result}) => {
			await store.commit('BookSearchState/setResult', {result})
		},
		fetchRequest: async () => {
			await store.dispatch('BookSearchState/fetch')
		}
	}

	registerCallback(bookSearchInteractorCallback)
}

export default {
	namespaced: true,
	state: () => {
		return {
			keyword: '',
			result: {}
		}
	},
	mutations: {
		setResult(state, {result}) {
			state.result = result
			console.log(result);
		},
	},
	actions: {
		fetch() {
			fetchRequest()
		},
		getSearchResult(_, keyword) {
			getSearchResult(keyword)
		}
	}
}

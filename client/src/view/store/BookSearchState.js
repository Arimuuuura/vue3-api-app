import { fetchRequest, registerCallback, getSearchResult } from '@/usecase/BookSearchApiInteractor'
import store from '@/view/store/index'

export const init = () => {
	const bookSearchInteractorCallback = {
		fetchResponse: async ({result}) => {
			await store.commit('BookSearchState/setResult', {result})
		},
	}

	registerCallback(bookSearchInteractorCallback)
}

export default {
	namespaced: true,
	state: () => {
		return {
			result: [],
			selectedItemId: null
		}
	},
	mutations: {
		setResult(state, {result}) {
			state.result = result
		},
		setSelectedItemId(state, id) {
			state.selectedItemId = id
		},
	},
	actions: {
		fetch() {
			fetchRequest()
		},
		getSearchResult(_, keyword) {
			getSearchResult(keyword)
		},
		setSelectedItemId({commit}, id) {
			commit('setSelectedItemId', id)
		}
	}
}

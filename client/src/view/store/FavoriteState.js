import { fetchRequest, registerCallback } from '@/usecase/AuthInteractor'
import { fetchRequest as favoriteBookmarkFetchRequest, registerCallback as favoriteBookmarkRegisterCallback } from '@/usecase/FavoriteBookmarkInteractor'
import store from '@/view/store/index'

export const init = () => {
	const authInteractorCallback = {
		fetchResponse: async (data) => {
			return data
		}
	}

	const favoriteBookmarkInteractorCallback = {
		fetchResponse: async ({items, summary}) => {
			store.commit('FavoriteState/setMyFavoriteBookmark', {items, summary})
		}
	}

	registerCallback(authInteractorCallback)
	favoriteBookmarkRegisterCallback(favoriteBookmarkInteractorCallback)
}

export default {
	namespaced: true,
	state: () => {
		return {
			body: 'initial',
			favoriteItems: [],
			selectedItemId: null
		}
	},
	mutations: {
		setState(state, body) {
			state.body = body
		},
		setMyFavoriteBookmark(state, {items, summary}) {
			state.favoriteItems = items
		},
		setSelectedItemId(state, id) {
			state.selectedItemId = id
		},
	},
	actions: {
		async fetch() {
			const a = await fetchRequest()
			console.log(a);
			// fetchRequest()
		},
		getMyFavoriteBookmark(_, {code}) {
			favoriteBookmarkFetchRequest(code)
		},
		setSelectedItemId({commit}, id) {
			commit('setSelectedItemId', id)
		}
	}
}

import { fetchRequest, updateFavoriteRequest, registerCallback } from '@/usecase/FavoriteBookmarkInteractor'
import store from '@/view/store/index'

export const init = () => {
	const favoriteBookmarkInteractorCallback = {
		fetchResponse: async ({items, summary}) => {
			store.commit('FavoriteState/setMyFavoriteBookmark', {items, summary})
		}
	}

	registerCallback(favoriteBookmarkInteractorCallback)
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
		setMyFavoriteBookmark(state, {items}) {
			state.favoriteItems = items
		},
		setSelectedItemId(state, id) {
			state.selectedItemId = id
		},
	},
	actions: {
		fetch(_,{readCode}) {
			fetchRequest(readCode)
		},
		setSelectedItemId({commit}, id) {
			commit('setSelectedItemId', id)
		},
		updateMyFavoriteBookmark(_, {action, code, id}) {
			updateFavoriteRequest(action, code, id)
		}
	}
}

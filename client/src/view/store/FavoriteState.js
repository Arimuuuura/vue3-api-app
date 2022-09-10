import { fetchRequest, accessTokenRequest, registerCallback } from '@/usecase/AuthInteractor'
import store from '@/view/store/index'

export const init = () => {
	const testApiInteractorCallback = {
		fetchResponse: async (data) => {
			console.log(data);
			return data
			// await store.commit('FavoriteState/setState', data)
		}
	}

	registerCallback(testApiInteractorCallback)
}

export default {
	namespaced: true,
	state: () => {
		return {
			body: 'initial'
		}
	},
	mutations: {
		setState(state, body) {
			state.body = body
		}
	},
	actions: {
		async fetch() {
			const a = await fetchRequest()
			console.log(a);
			// fetchRequest()
		},
		async getAccessToken(_, {code}) {
			accessTokenRequest(code)
		}
	}
}

// token = IQABNIvuKyEavTOLXyvWg-ucsp1PfhgJLhEr1lyjfxqpNJTMkbH
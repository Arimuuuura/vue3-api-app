import { fetchRequest, registerCallback } from '@/usecase/UserApiInteractor'
import store from '@/view/store/index'

export const init = () => {
	const userApiInteractorCallback = {
		fetchResponse: ({users}) => {
			store.commit('UserApiState/printTest', {users})
		}
	}

	registerCallback(userApiInteractorCallback)
}

export default {
	namespaced: true,
	state: () => {
		return {
			users: [{}]
		}
	},
	mutations: {
		printTest(state, {users}) {
			state.users = users
		}
	},
	actions: {
		fetch() {
			fetchRequest()
		}
	}
}

export default {
	namespaced: true,
	state: () => {
		return {
			updateCode: '',
			readCode: '',
		}
	},
	mutations: {
		setUpdateCode(state, updateCode) {
			state.updateCode = updateCode
		},
		setReadCode(state, readCode) {
			state.readCode = readCode
		},
	},
	actions: {
		setUpdateCode({commit}, updateCode) {
			commit('setUpdateCode', updateCode)
		},
		setReadCode({commit}, readCode) {
			commit('setReadCode', readCode)
		}
	}
}

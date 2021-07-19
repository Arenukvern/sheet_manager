export default {
  namespaced: true,
  state: {
    theme: 'dark',
  },

  getters: {
    theme(state: any) {
      return state.theme
    },
  },

  mutations: {
    updateTheme(state: any, newtheme: string) {
      state.theme = newtheme
    },
  },

  actions: {
    async updateTheme(context: any, newTheme: string) {
      context.commit('updateTheme', newTheme)
    },
  },
}

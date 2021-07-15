export default {
  state: {
    theme: 'dark',
  },

  action: {
    async varyTheme(context: any, newTheme: string) {
      context.commit('updateTheme', newTheme)
    },
  },

  mutations: {
    updateTheme(state: any, newtheme: string) {
      state.theme = newtheme
    },
  },

  getters: {
    gettTheme(state: any) {
      return state.theme
    },
  },
}

import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

@Module({ name: 'testVuex', namespaced: true })
export default class Counter2 extends VuexModule {
  testTheme = 'dark'

  @Mutation
  increment() {
    this.testTheme = 'dark'
  }
  @Mutation
  decrement() {
    this.testTheme = 'base'
  }

  // action 'incr' commits mutation 'increment' when done with return value as payload
  @Action({ commit: 'increment' })
  incr() {
    return this.testTheme
  }
  // action 'decr' commits mutation 'decrement' when done with return value as payload
  @Action({ commit: 'decrement' })
  decr() {
    return this.testTheme
  }
}

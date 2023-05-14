import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      count: 0
    }
  },
  mutations: {
    setInitialState(state, newValue) {
      state.count = newValue;
    },
    decrement (state) {
      state.count--
    },
    updateTimer(state, newTimerValue) {
      state.count = newTimerValue;
    }
  }
})

export { store };
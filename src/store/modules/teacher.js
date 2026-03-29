const TEACHER_USERNAME = 'teresa'
const TEACHER_PASSWORD = 'teresa'

export default {
    state: {
        isLoggedIn: false,
        customWords: []
    },
    getters: {
        getTeacherLoggedIn: state => state.isLoggedIn,
        getCustomWords: state => state.customWords
    },
    mutations: {
        teacherLogin(state) {
            state.isLoggedIn = true
        },
        teacherLogout(state) {
            state.isLoggedIn = false
            state.customWords = []
        },
        setCustomWords(state, words) {
            state.customWords = words
        }
    },
    actions: {
        teacherLogin({ commit }, { username, password }) {
            if (username === TEACHER_USERNAME && password === TEACHER_PASSWORD) {
                commit('teacherLogin')
                return true
            }
            return false
        },
        teacherLogout({ commit }) {
            commit('teacherLogout')
        },
        setCustomWords({ commit }, words) {
            commit('setCustomWords', words)
        }
    }
}

export default {
    
    state: {
        modal: false,
        letter: "",
        infoFieldRed: [],
        infoFieldGreen: []
    },
    
    getters: {
        getModal: function (state) {
            return state.modal;
        },
        getLetter: function (state) {
            return state.letter;
        },
        getInfoFieldRed: function (state) {
            return state.infoFieldRed
        },
        getInfoFieldGreen: function (state) {
            return state.infoFieldGreen
        }
    },
    
    mutations: { 
        hideModal: function (state) {
            state.modal = false
        },
        showModal: function (state, {msg, letraInfoRojo, letraInfoVerde}) {   
            state.modal = true
            state.letter = msg
            state.infoFieldRed = letraInfoRojo
            state.infoFieldGreen = letraInfoVerde
        }
    },
    
    actions: {
        hideModal: function(context) {
            context.commit('hideModal')
        },
        showModal: function(context, {msg, letraInfoRojo, letraInfoVerde }) {
            context.commit('showModal', {msg, letraInfoRojo, letraInfoVerde });  
        }
    }
}
export default {
    
    state: {
        modal: false,
    },
    
    getters: {
        getModal: function (state) {
            return state.modal;
        }
    },
    
    mutations: { 
        hideModal: function (state) {
            state.modal = false
        },
        showModal: function (state) {   
            state.modal = true
        }
    },
    
    actions: {
        hideModal: function(context) {
            context.commit('hideModal')
        },
        showModal: function(context) {
            context.commit('showModal' );  
        }
    }
}
export default {
    
    state: {
        isLogging: false,
        collectedKeys: [],
        fundstueckCount: 0
    },
    
    getters: {
        getLoggerStatus: function (state) {
            return state.isLogging;
        },
    
        getCollectedKeys: function (state) {
            return state.collectedKeys
        },
        getFundstueckCount: function (state) {
            return state.fundstueckCount
        }
    },
    
    mutations: { 
        startLog: function (state) {
            state.isLogging = true
        },
        stopLog: function (state) {   
            state.isLogging = false
        },
        updateCollectedKeys: function (state, id) {
            state.collectedKeys.push(id)
        },
        emptyArray: function (state) {
            state.collectedKeys.length = 0
        },
        updateFundstueckCount: function (state) {
            state.fundstueckCount = state.fundstueckCount + 1
        },
        deleteFundstueckCount: function (state) {
            state.fundstueckCount = 0
        }
    },
    
    actions: {
        startLogging: function(context) {
            context.commit('startLog')
        },
        stopLogging: function(context) {
            context.commit('stopLog');  
        },
        updateCollectedKeys: function(context, id) {
            context.commit('updateCollectedKeys', id);  
        },
        emptyArray: function(context) {
            context.commit('emptyArray')
        },
        updateFundstueckCount: function(context) {
            context.commit('updateFundstueckCount')
        },
        deleteFundstueckCount: function(context) {
            context.commit('deleteFundstueckCount')
        }
    }
}
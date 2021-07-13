export default {
    
    state: {
        isLogging: false,
        collectedItems: [],
        collectedKeys: [],
        fundstueckCount: 0
    },
    
    getters: {
        getLoggerStatus: function (state) {
            return state.isLogging;
        },
        getCollectedItems: function (state) {
            return state.collectedItems
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
        updateCollectedItems: function (state, element) {
            state.collectedItems.push(element)
        },
        updateCollectedKeys: function (state, id) {
            state.collectedKeys.push(id)
        },
        emptyArray: function (state) {
            state.collectedItems.length = 0
            state.collectedKeys.length = 0
        },
        updateFundstueckCount: function (state) {
            state.fundstueckCount = state.fundstueckCount + 1
        }
    },
    
    actions: {
        startLogging: function(context) {
            context.commit('startLog')
        },
        stopLogging: function(context) {
            context.commit('stopLog');  
        },
        updateCollectedItems: function(context, element) {
            context.commit('updateCollectedItems', element);  
        },
        updateCollectedKeys: function(context, id) {
            context.commit('updateCollectedKeys', id);  
        },
        emptyArray: function(context) {
            context.commit('emptyArray')
        },
        updateFundstueckCount: function(context) {
            context.commit('updateFundstueckCount')
        }
    }
}
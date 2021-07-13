import Vue from 'vue';
import Vuex from 'vuex';

import logger from "./modules/logger"
import modal from "./modules/modal"
import data from "@/utils/data.json"
import solution from "@/utils/solution.json"

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        alphabet: data.sopita,
        palabras: solution.palabras
    },
    getters: {
        getAlphabet: function (state) {
            return state.alphabet;
        }
    },
    mutations: {
        updateAlphabet: function (state, alteredState) {
            state.alphabet = alteredState
        }
    },
    actions: {
        updateAlphabet: function (context, alteredState) {
            context.commit('updateAlphabet', alteredState)
        }
    },
    modules: {
        logger,
        modal
    },
    
    
});

export default store;